import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, Clock } from 'three'
import gsap from 'gsap'
document.title = '06 - Animation'
document.querySelector('#app').innerHTML = `<h2>lesson 6: Animation</h2>`

const renderSize = {
  width: 800,
  height: 600
}

// Setup the scene
const scene = new Scene()
// create a red cube
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xff0000 })
const mesh = new Mesh(geometry, material)
scene.add(mesh)

const camera = new PerspectiveCamera(75, renderSize.width / renderSize.height)
camera.position.z = 3
camera.lookAt(mesh.position)

const canvas = document.querySelector('canvas')
const renderer = new WebGLRenderer({
  canvas: canvas
})
renderer.setSize(renderSize.width, renderSize.height)


/**
 * Animate
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

const clock = new Clock() 
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  // mesh.position.x = Math.cos(elapsedTime)
  // mesh.position.y = Math.sin(elapsedTime)

  // render 
  renderer.render(scene, camera)
  // continue on to the next frame
  window.requestAnimationFrame(tick)
}
tick()

