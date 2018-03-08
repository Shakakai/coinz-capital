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
    <p>
At Coinz Capital, we want to accelerate the adoption of blockchain technologies by investing in the critical components needed to bring it into everyday life. Our focus is developing and supporting companies working on advanced cryptography, blockchain 3.0 platforms, next generation exchanges, token compliance systems, and the emerging blockchain economy. We're a decade into the blockchain revolution but there's still much of the core ecosystem that has yet to come to fruition. Coinz Capital is here to fund that gap.
    </p>
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
      <span className="role">Founder</span>
      <span className="bio">Cypherpunk, startup advisor, investor, founder.</span>
    </div>
    <div className="member">
      <img className="photo" src="/todd.jpeg" />
      <span className="name">Todd Cullen</span>
      <span className="role">Founder</span>
      <span className="bio">
      Founder & CTO - <a href="http://www.thoughtleadr.com/">ThoughtLeadr</a><br/>
      Founder - <a href="http://www.reigndesign.com">ReignDesign</a><br/>
      R & D - Nortel<br/>
      Engineer - IBM & T-Systems
      </span>
    </div>
    </div>
  </div>
)

const Contact = () => (
  <div id="contact">
    <h1>Get in Touch</h1>
    <div id="media">Media Inquiries: <a href="mailto:media@coinz.capital">Media@coinz.capital</a></div>
    <div id="investor">Investor Inquiries: <a href="mailto:investor@coinz.capital">Investor@coinz.Capital</a></div>
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

    this.renderedRedirect = null;
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
    //console.log(this.state);
    //console.log(this.props);
    if(this.state && this.state.redirect && this.state.redirect !== this.renderedRedirect) {
      //console.log("RENDER REDIRECT")
      this.renderedRedirect = this.state.redirect;
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
