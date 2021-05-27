import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer } from 'three'
document.title = '03 - Basic Scene'
document.querySelector('#app').innerHTML = `<h2>lesson 3: basic scene</h2>`

/*
 * To get started, we need the following:
 * - a scene
 * - objects to put in the scene
 * - a camera
 * - a renderer
 */

/*
 * Let's start with a scene.
 * A scene is like a container. 
 * We can drop objects, lights, etc in it. 
 * At some point, we ask three.js to render the scene.
 */

const scene = new Scene()


/*
 * Now let's add an object to the scene.
 * For this, we will create a Mesh. 
 * A Mesh is a combination of _geometry_ (or, shape) and a _material_ (how it looks)
 * We will add a red cube.
 */

// we are going to use BoxGeometry for this basic example. 
// the arguments relate to the object's size: width, height, depth
const geometry = new BoxGeometry(1, 1, 1)

// the MeshBasicMaterial accepts an object of options, here we will specify a color.
const material = new MeshBasicMaterial({ color: 0xff0000 })

// we can put the two together with the Mesh class
const mesh = new Mesh(geometry, material)

// finally, we can add it to the scene:
scene.add(mesh)


/*
 * Let's add a camera.
 * The camera is not visible, it's more like a point of view. When we render the scene, it will be from
 * a camera's point of view. 
 * 
 * You can have multiple cameras in a scene and switch between them just like on a movie set. 
 * Typically, we only use one camera. 
 * 
 * For this demo we will use a PerspectiveCamera which gives us depth perception.
 */

// lets specify some sizes for our render
const renderSize = {
  width: 800,
  height: 600
}

// the perspecitive camera receives two arguments: 
// a field of view (fov), expressed in degrees
// an aspect ratio: the width of the render / height of the render
const camera = new PerspectiveCamera(75, renderSize.width / renderSize.height)

// we need to position the camera, let's pull it back.
camera.position.z = 3

// add it to the scene
scene.add(camera)

/*
 * Now let's add a renderer.
 * We render the scene from a camera's point of view.
 * Results drawn into a canvas html element.
 * ThreeJS uses WebGL to draw the render.
 */

// grab a reference to our canvas. 
const canvas = document.querySelector('canvas')

// setup the renderer
const renderer = new WebGLRenderer({
  canvas: canvas
})

// set the size of the viewport canvas
renderer.setSize(renderSize.width, renderSize.height)

// render the scene
renderer.render(scene, camera)