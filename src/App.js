import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Link
} from 'react-router-dom'
import * as THREE from 'three';

class Home extends React.Component {
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

    const ambient = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambient);

		const light = new THREE.PointLight( 16777215,3);
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
    return (<div id="home">
      <canvas id="3dCanvas" width={this.width} height={this.height} />
      <h1>Coinz Capital</h1>
      <h2>Venture Capital Tokenized</h2>
    </div>
    );
  }
}

const Thesis = () => (
  <div id="thesis">
    <h1>Investment Thesis</h1>
    <p>With any revolutionary breakthrough in technology, foundational pieces of the ecosystem need to be put in place before mainstream adoption can occur. We’re a decade into the blockchain revolution and high value core components of the future of computing have yet to be realized. At Coinz Venture Partners, we want to accelerate the adoption of blockchain technologies by investing in the critical components needed to bring it into everyday life.</p>
  </div>
)

const Team = () => (
  <div id="team">
    <h1>Team</h1>
    <div className="members">
    <div className="member">
      <img className="photo" src="/adam.jpeg" />
      <span className="name">Adam Gering</span>
      <span className="role">General Partner</span>
      <span className="bio">lorem ipsum</span>
    </div>
    <div className="member">
      <img className="photo" src="/todd.jpeg" />
      <span className="name">Todd Cullen</span>
      <span className="role">General Partner</span>
      <span className="bio">lorem ipsum</span>
    </div>
    </div>
  </div>
)

const Contact = () => (
  <div id="contact">
    <h1>Contact</h1>
    <span id="email">hello (at) coinz.capital</span>
  </div>
)

const Menu = () => (
  <div id="menu">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/thesis">Investment Thesis</Link></li>
      <li><Link to="/team">Team</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </div>
)

class NextSection extends React.Component {

  createLink(next) {
    return <div id="next">
      <Link to={next}>▼</Link>
    </div>;
  }

  render() {
    switch(this.props.location.pathname){
      case "/menu":
        return <div />;
      case "/contact":
        return this.createLink("/");
      case "/":
        return this.createLink("/thesis");
      case "/thesis":
        return this.createLink("/team");
      case "/team":
        return this.createLink("/contact");
      default:
       return <div></div>;
    }
  }
}

const NextSectionWithRouter = withRouter(NextSection);

const CoinzCapitalOneSite = () => (
  <Router>
    <div>

      <div id="menu-bar">
        <Link to="/menu"> ••• </Link>
      </div>

      <Route exact path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/thesis" component={Thesis} />
      <Route path="/team" component={Team} />
      <Route path="/contact" component={Contact} />

      <NextSectionWithRouter />

    </div>
  </Router>
)
export default CoinzCapitalOneSite
