import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
document.title = '08 - Fullscreen & Resizing'

// set the render size to the 
const renderSize = {
  width: window.innerWidth, 
  height: window.innerHeight
}

// setup object for cursor tracking
const cursor = {
  x: 0,
  y: 0
}

// Setup the scene
const scene = new Scene()
// create a red cube
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xff0000 })
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
