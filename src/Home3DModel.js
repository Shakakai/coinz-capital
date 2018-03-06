import React from 'react';
import * as THREE from 'three';

class Home3DModel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.height = window.innerHeight - 200;
    this.width = window.innerWidth;

    const loader = new THREE.JSONLoader();
    loader.load("/3d-model.json", this.onLoad.bind(this), null, null);

    this.mouse = {
        x: 0,
        y: 0
    };
    window.addEventListener("mousemove", n=>this.onMouseMove(n))
  }

  onMouseMove(n) {
      this.mouse.x = n.clientX - this.width / 2;
      this.mouse.y = n.clientY - this.height / 2;
  }

  onLoad(geometry, materials) {
    this.setState({ "geometry" : geometry, "materials" : materials });
    if(this.state && this.state.mounted) {
      this.setupThree();
    }
  }

  componentDidMount() {
    this.setState({"mounted" : true});
    if(this.state && this.state.geometry) {
      this.setupThree();
    }
  }

  setupThree() {

    //camera
    this.camera = new THREE.PerspectiveCamera( 10, this.width / this.height, 1, 1000 );
		this.camera.position.z = 5;

    //scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x131116);

    const ambient = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambient);

		const light = new THREE.PointLight( 16777215, 15);
    light.position.set(.5, 0, 1);
    light.position.z = 1000;
    light.position.multiplyScalar(700);

    this.scene.add( light );

    const materials = new THREE.MeshPhongMaterial({
      color: 329224,
      specular: 3355443,
      shininess: 20,
      wireframe: !0
    });

    this.mesh = new THREE.Mesh(this.state.geometry, materials);
    this.scene.add(this.mesh);

    //WebGL renderer
    const canvas = document.getElementById("3dCanvas");
    this.renderer = new THREE.WebGLRenderer( { canvas: canvas } );

    window.requestAnimationFrame(this.onAnimate.bind(this));

    this.renderer.render( this.scene, this.camera );

  }

  onAnimate() {
    this.mesh.rotation.x += .05 * (.001 * this.mouse.y - this.mesh.rotation.x);
    this.mesh.rotation.y += .05 * (.001 * this.mouse.x - this.mesh.rotation.y);
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.onAnimate.bind(this));
  }

  render() {
    return (<canvas id="3dCanvas" width={this.width} height={this.height} />);
  }
}

export default Home3DModel;
