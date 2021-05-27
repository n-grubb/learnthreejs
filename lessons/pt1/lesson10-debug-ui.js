import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

document.title = '10 - Debug UI'

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

// Setup the scene
const scene = new Scene()
const geometry = new BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new MeshBasicMaterial({ color: parameters.color, wireframe: true })
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
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui
  .addColor(parameters, 'color')
  .onChange(() => {
    material.color.set(parameters.color)
  })
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
