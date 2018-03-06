import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Link,
  Redirect
} from 'react-router-dom';
import Home3DModel from './Home3DModel.js';

const Home = () => (
  <div id="home">
    <Home3DModel />
    <h1>Coinz Capital</h1>
    <h2>A Blockchain VC</h2>
  </div>
)

const Thesis = () => (
  <div id="thesis">
    <div>
    <h1>Investment Thesis</h1>
    <p>With any revolutionary breakthrough in technology, foundational pieces of the ecosystem need to be put in place before mainstream adoption can occur. We’re a decade into the blockchain revolution and high value core components of the future of computing have yet to be realized. At Coinz Venture Partners, we want to accelerate the adoption of blockchain technologies by investing in the critical components needed to bring it into everyday life.</p>
    </div>
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
      <span className="bio">Cypherpunk, startup advisor, investor, founder.</span>
    </div>
    <div className="member">
      <img className="photo" src="/todd.jpeg" />
      <span className="name">Todd Cullen</span>
      <span className="role">General Partner</span>
      <span className="bio">CEO/Founder @ThoughtLeadr Founder/CTO @ReignDesign Built Unified Comm. Platform for Nortel. Consulted for IBM, T-Systems, and @bizsphere.</span>
    </div>
    </div>
  </div>
)

const Contact = () => (
  <div id="contact">
    <h1>Get in Touch</h1>
    <span id="email">Hello (at) Coinz (dot ) Capital</span>
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

  constructor(props, context) {
    super(props, context);
    window.document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    // back 37, 38
    if(e.keyCode === 37 || e.keyCode === 38) {
      this.setState({redirect: this.prevUrl()})
    // forward 39, 40
    } else if(e.keyCode === 39 || e.keyCode === 40) {
      this.setState({redirect: this.nextUrl()})
    }
  }

  createLink(next) {
    return <div id="next">
      <Link to={next}>▼</Link>
    </div>;
  }

  nextUrl() {
    switch(this.props.location.pathname){
      case "/menu":
        return null;
      case "/contact":
        return "/";
      case "/":
        return "/thesis";
      case "/thesis":
        return "/team";
      case "/team":
        return "/contact";
      default:
       return null;
     }
  }

  prevUrl() {
    switch(this.props.location.pathname){
      case "/menu":
        return null;
      case "/contact":
        return "/team";
      case "/":
        return "/contact";
      case "/thesis":
        return "/";
      case "/team":
        return "/thesis";
      default:
       return null;
     }
  }

  renderRedirect() {
    if(this.state && this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return null;
  }

  render() {
    const url = this.nextUrl();
    if(url) {
      return <div>
        {this.createLink(url)}
        {this.renderRedirect()}
      </div>;
    }
    return <div>
      {this.renderRedirect()}
    </div>;
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
