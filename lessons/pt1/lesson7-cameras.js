import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
document.title = '07 - Cameras'
document.querySelector('#app').innerHTML = `<h2>lesson 7: cameras</h2>`

const renderSize = {
  width: 800,
  height: 600
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

/**
 * Setup a Perspective camera
 * this time we will add two extra parameters
 *
 * parameters:
 * 1. `fov` (field of view): corresponds to your camera view's vertical amplitude angle in degrees.
 *     If you use a small angle, you'll end up with a long scope effect, and if you use a 
 *     wide-angle, you'll end up with a fish eye effect because, in the end, what the camera sees
 *     will be stretched or squeezed to fit the canvas.
 * 2. `aspect`: the aspect ratio or the width/height 
 * 3. `near`: anything closer than the near value will not be shown
 * 4. `far`: anything farterh than the far value will not be shown
 * 3 & 4 basically make up your draw distance.
 */
const camera = new PerspectiveCamera(75, renderSize.width / renderSize.height, 1, 100)

/**
 * Setup an Orthagraphic camera
 * 
 * The orthographic camera lacks perspective, meaning all objects will display as the same size, 
 * regardless of how far away they are from the camera.
 * 
 * The paramaters used for this camera describe how far the camera can see in each direction. 
 * 1. left
 * 2. right
 * 3. top
 * 4. bottom
 * 5. near (see above)
 * 6. far (see above)
 */
// const camera = new OrthographicCamera(- 1, 1, 1, - 1, 0.1, 100)

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
