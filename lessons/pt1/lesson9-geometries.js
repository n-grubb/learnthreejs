import { Scene, BufferAttribute, BufferGeometry, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
document.title = '09 - Geometries'

// set the render size to the 
const renderSize = {
  width: window.innerWidth, 
  height: window.innerHeight
}

// Setup the scene
const scene = new Scene()

/**
 * Box Geometry has 6 args
 * width, height, depth, width segments, height segments, depth segments
 * the segments represent the number of subdivisions to create triangles for that geometry
 * with a plane, or the face of a cube, a default value of 1 creates one subdivision,
 * resulting in 2 triangles to compose the face.
 * by specifying 2, we will get 8 triangles per face
 */
// const geometry = new BoxGeometry(1, 1, 1, 2, 2, 2)
// const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// const mesh = new Mesh(geometry, material)
// scene.add(mesh)


/**
 * If we want to build a shape that is not very complex or precise, we can do this on the fly 
 * by creating a new BufferGeometry
 */
const geometry = new BufferGeometry()
// To add vertices to a BufferGeometry you must start with a Float32Array
// const positionsArray = new Float32Array([
//   0, 0, 0, // First vertex
//   0, 1, 0, // Second vertex
//   1, 0, 0  // Third vertex
// ])
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++)
{
  positionsArray[i] = (Math.random() - 0.5) * 4
}
const positionsAttribute = new BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
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
