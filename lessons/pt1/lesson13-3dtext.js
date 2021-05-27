import { Scene, PerspectiveCamera, WebGLRenderer, Clock, MeshBasicMaterial, MeshNormalMaterial, TorusGeometry, AmbientLight, PointLight, FontLoader, TextGeometry, Mesh, MeshMatcapMaterial, TextureLoader } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

document.title = '13 - 3D Text'

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

const gui = new dat.GUI()

/**
 * Setup the scene
 */
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
const matcapTexture = textureLoader.load('/assets/textures/matcaps/7.png')
const anotherMatcapTexture = textureLoader.load('/assets/textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
  '/assets/fonts/helvetiker_regular.typeface.json',
  font => {
    const textGeometry = new TextGeometry(
      'noah grubb',
      {
        font: font,
        size: .5,
        height: 0.075,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 10
      }
    )
    textGeometry.computeBoundingBox()
    textGeometry.center()    
    const textMaterial = new MeshMatcapMaterial({ matcap: matcapTexture })
    const text = new Mesh(textGeometry, textMaterial)
    scene.add(text)
  }
)

/**
 * Add Objects
 */
const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45)
const donutMaterial = new MeshMatcapMaterial({ matcap: anotherMatcapTexture })

for (let i = 0; i < 100; i++) {
  const donut = new Mesh(donutGeometry, donutMaterial)

  // add random positioning, rotation and scale (size)
  donut.position.x = (Math.random() - 0.5) * 10
  donut.position.y = (Math.random() - 0.5) * 10
  donut.position.z = (Math.random() - 0.5) * 10 
  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI
  const scale = Math.random()
  donut.scale.set(scale, scale, scale)
  scene.add(donut)
}

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
  
  // render 
  renderer.render(scene, camera)
  // continue on to the next frame
  window.requestAnimationFrame(tick)
}
tick()

/**
 * Resize Observer
 */
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

/**
 * Full Screen Observer
 */
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
