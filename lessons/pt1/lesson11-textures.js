import { Scene, BoxGeometry, SphereGeometry, ConeGeometry, TorusGeometry, RepeatWrapping, MirroredRepeatWrapping, NearestFilter, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, LoadingManager, TextureLoader } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'

import imageSource from '../assets/textures/door/color.jpg'
console.log(imageSource)

document.title = '11 - Textures'

// set the render size to the 
const renderSize = {
  width: window.innerWidth, 
  height: window.innerHeight
}

const parameters = { 
  color: 0xa4ff,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}

// The standard way
// const image = new Image()
// image.src = '/assets/textures/door/color.jpg'
// const texture = new Texture(image)
// image.addEventListener('load', () => {
//   texture.needsUpdate = true
// })

// using TextureLoader
// const textureLoader = new TextureLoader()
// const texture = textureLoader.load(
//   '/assets/textures/door/color.jpg',
//   () => {
//     console.log('loading finished')
//   },
//   () => {
//     console.log('loading progressing')
//   }, 
//   () => {
//     console.log('loading error')
//   }
// )

// using a LoadingManager & TextureLoader
const loadingManager = new LoadingManager() 
loadingManager.onStart = () => {
  console.log('loading started')
}
loadingManager.onLoad = () => {
  console.log('loading finished')
}
loadingManager.onProgress = () => {
  console.log('loading progressing')
}
loadingManager.onError = () => {
  console.log('loading error')
}
const textureLoader = new TextureLoader(loadingManager)

// load all of our images..
// const colorTexture = textureLoader.load('/assets/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/assets/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/assets/textures/checkerboard-8x8.png')
const colorTexture = textureLoader.load('/assets/textures/minecraft.png')
const alphaTexture = textureLoader.load('/assets/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/assets/textures/door/height.jpg')
const normalTexture = textureLoader.load('/assets/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/assets/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/assets/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/assets/textures/door/roughness.jpg')


// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = MirroredRepeatWrapping
// colorTexture.wrapT = MirroredRepeatWrapping
colorTexture.generateMipmaps = false
colorTexture.minFilter = NearestFilter
colorTexture.magFilter = NearestFilter

// Setup the scene
const scene = new Scene()
const geometry = new BoxGeometry(1, 1, 1, 2, 2, 2)

// test other geometries
// const geometry = new SphereGeometry(1, 32, 32)
// const geometry = new ConeGeometry(1, 1, 32)
// const geometry = new TorusGeometry(1, 0.35, 32, 100)

// const material = new MeshBasicMaterial({ color: parameters.color, wireframe: true })
const material = new MeshBasicMaterial({ map: colorTexture })
const mesh = new Mesh(geometry, material)
scene.add(mesh)


const camera = new PerspectiveCamera(75, renderSize.width / renderSize.height, 1, 100)
camera.position.z = 3
camera.lookAt(mesh.position)

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
 * Debug Controls
 */
const gui = new dat.GUI()
gui
  .add(mesh.position, 'y')
  .min(- 3)
  .max(3)
  .step(0.01)
  .name('elevation')
// gui.add(mesh, 'visible')
// gui.add(material, 'wireframe')
// gui
//   .addColor(parameters, 'color')
//   .onChange(() => {
//     material.color.set(parameters.color)
//   })
gui.add(parameters, 'spin')


/**
 * Animate
 */
const tick = () => {
  // update controls
  controls.update()
   
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
