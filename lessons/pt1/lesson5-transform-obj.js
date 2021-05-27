import { Scene, AxesHelper, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer, Group } from 'three'
document.title = '03 - Basic Scene'
document.querySelector('#app').innerHTML = `<h2>lesson 5: transform objects</h2>`

const renderSize = {
  width: 800,
  height: 600
}

const scene = new Scene()

/**
 * Axes Helper
 * A point of reference for our axes.
 * AxesHelper receives a size arg.
 */
const axesHelper = new AxesHelper(2)
scene.add(axesHelper)

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xff0000 })
const mesh = new Mesh(geometry, material)

// play with position
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1

// play with scale
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5 

// play with rotation
// rotation and quarternion are linked, two ways to handle setting the rotation of objects.
// rotation is not a child of Vector3 like the other transforms, but instead of Euler.
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
// sometimes issues occur when messing with rotation. 
// because of this, we can use quarternion which allows manipulation of rotation in a more mathematical way.
// scene.add(mesh)

const group = new Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)

const camera = new PerspectiveCamera(75, renderSize.width / renderSize.height)
camera.position.z = 3
// camera.lookAt(mesh.position)
scene.add(camera)

const canvas = document.querySelector('canvas')
const renderer = new WebGLRenderer({
  canvas: canvas
})
renderer.setSize(renderSize.width, renderSize.height)
renderer.render(scene, camera)