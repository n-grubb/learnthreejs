import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, SphereGeometry, PlaneGeometry, TorusGeometry, Clock, TextureLoader, Color, DoubleSide, BackSide, MeshNormalMaterial, MeshMatcapMaterial, MeshDepthMaterial, AmbientLight, PointLight, MeshLambertMaterial, MeshPhongMaterial, MeshToonMaterial, NearestFilter, MeshStandardMaterial, BufferAttribute, CubeTextureLoader } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

document.title = '12 - Materials'

// set the render size to the 
const renderSize = {
  width: window.innerWidth, 
  height: window.innerHeight
}

const parameters = { 
  color: 0xfff000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}

// Setup the scene
const scene = new Scene()

/**
 * Lights
 */
const ambientLight = new AmbientLight(0xffffff, .5)
scene.add(ambientLight)

const pointLight = new PointLight(0xffffff, .5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Textures
 */
const textureLoader = new TextureLoader()

const doorColorTexture = textureLoader.load('/assets/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/assets/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/assets/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/assets/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/assets/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/assets/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/assets/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/assets/textures/matcaps/7.png')
const gradientTexture = textureLoader.load('/assets/textures/gradients/5.jpg')

const gui = new dat.GUI()

/**
 * Objects
 */
// const material = new MeshBasicMaterial({ map: doorColorTexture })
// we can modify other parameters
// material.color = new Color(parameters.color)
// material.wireframe = true
// material.transparent = true
// material.opacity = .5
// material.alphaMap = doorAlphaTexture
// material.side = DoubleSide

// let's try some other materials
// const material = new MeshNormalMaterial()
// material.flatShading = true

// const material = new MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new MeshDepthMaterial()

// ! the following materials need a light source

// const material = new MeshLambertMaterial()

// const material = new MeshPhongMaterial()
// material.shininess = 500
// material.specular = new Color(0x1188ff)

// ! cell shaded - cool
// const material = new MeshToonMaterial()
// gradientTexture.minFilter = NearestFilter
// gradientTexture.magFilter = NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// const material = new MeshStandardMaterial()
// material.roughness = 0
// material.metalness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = .05
// material.roughnessMap = doorRoughnessTexture
// material.metalnessMap = doorMetalnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(.5, .5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// Environment Map
const cubeTextureLoader = new CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
  '/assets/textures/environmentMaps/1/px.jpg',
  '/assets/textures/environmentMaps/1/nx.jpg',
  '/assets/textures/environmentMaps/1/py.jpg',
  '/assets/textures/environmentMaps/1/ny.jpg',
  '/assets/textures/environmentMaps/1/pz.jpg',
  '/assets/textures/environmentMaps/1/nz.jpg'
])

const material = new MeshStandardMaterial()
material.metalness = .85
material.roughness = .05
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
material.envMap = environmentMapTexture


const sphere = new Mesh(
  new SphereGeometry(.5, 64, 64), // geometry
  material // material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute('uv2', new BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new Mesh(
  new PlaneGeometry(1, 1, 100, 100),
  material
)
plane.geometry.setAttribute('uv2', new BufferAttribute(plane.geometry.attributes.uv.array, 2))


const torus = new Mesh(
  new TorusGeometry(.3, .2, 64, 128),
  material
)
torus.position.x = 1.5
torus.geometry.setAttribute('uv2', new BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(
  sphere,
  plane,
  torus
)

/**
 * Camera
 */
const camera = new PerspectiveCamera(75, renderSize.width / renderSize.height, 1, 100)
camera.position.z = 3
// camera.lookAt(mesh.position)


/**
 * Renderer
 */
const canvas = document.querySelector('canvas')
const renderer = new WebGLRenderer({
  canvas: canvas
})
renderer.setSize(renderSize.width, renderSize.height)

/**
 * Setup Orbit controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Animate
 */
const clock = new Clock()

const tick = () => {
  // update controls
  controls.update()

  const elapsedTime = clock.getElapsedTime()

  // Update objects
  // sphere.rotation.y = 0.1 * elapsedTime
  // plane.rotation.y = 0.1 * elapsedTime
  // torus.rotation.y = 0.1 * elapsedTime

  // sphere.rotation.x = 0.15 * elapsedTime
  // plane.rotation.x = 0.15 * elapsedTime
  // torus.rotation.x = 0.15 * elapsedTime
  
  // render 
  renderer.render(scene, camera)
  // continue on to the next frame
  window.requestAnimationFrame(tick)
}
tick()

window.addEventListener('resize', () => {
  // Update sizes
  renderSize.width = window.innerWidth
  renderSize.height = window.innerHeight

  // Update camera
  camera.aspect = renderSize.width / renderSize.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(renderSize.width, renderSize.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyF') {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen()
      }
      else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }
})
