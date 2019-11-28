import React from 'react';
import '../../styles/style.scss';
import { Switch, Route, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from './styles.module.scss';
import './transitions.scss';
import Header from '../Header/index.js';
import Footer from '../Footer/index.js';
import Home from '../Home/index.js';
import Artists from '../Artists/index.js';
import Register from '../Register/index.js';
import SinglePage from '../SinglePage/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDesktop: (window.innerWidth > 950) ? true : false,
    }

    this.mobileSize = 950;

    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize()  {
    this.setState( (prevState) => {
      let newIsDesktop = (window.innerWidth <= this.mobileSize) ? false : true;
      if (prevState.isDesktop !== newIsDesktop) {
        return {
          isDesktop: newIsDesktop,
        }
      }
    });
  }

  render() {
    const { location } = this.props;
    // const { key } = location;    
    const currentLocation = location.pathname.split("/")[1];
    const currentClass = (currentLocation === "") ? "home" : currentLocation;
    
    const timeout = { enter: 4000, exit: 1000 };
    
    return (
      <main>
        <Background />
        <Header />
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            timeout={timeout}
            appear={true}
            // mountOnEnter={false}
            // unmountOnExit={true}
            classNames={currentClass}
          >
            <Switch location={location}>
              <Route path="/" exact
                render={(props) => 
                  <Home {...props} isDesktop={this.state.isDesktop}/>
                }/>
              <Route path="/artists"
                render={(props) =>
                  <Artists {...props} isDesktop={this.state.isDesktop}/>
                }/>
              <Route path="/register" exact component={Register} />
              <Route path="/:pageName" component={SinglePage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </main>
    );
  }
}

class Background extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundImage: "",
    }
  }

  componentDidMount() {
    this.setBackground();
  }
  
  setBackground() {
    const backgroundImages =
      [
        'bianca_nils_jam.jpg',
        'feet.jpg',
        'social_dancers.jpg',
        'band.jpg',
        'knee_slap.jpg'
      ];
    let random = Math.floor(Math.random() * (backgroundImages.length));
    const backgroundImage = require('../../assets/img/' + backgroundImages[random]);

    this.setState({
      backgroundImage: backgroundImage
    });
  }
  
  render() {
    return (
      <div
        className={styles.background}
        style={{backgroundImage: `url(${this.state.backgroundImage})`}}
      ></div>
    )
  }
}

export default withRouter(App);
