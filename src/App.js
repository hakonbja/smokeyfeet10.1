import React from 'react';
import './styles/style.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './styles/App.module.scss';
import Header from './components/Header/index.js';
import Footer from './components/Footer/index.js';
import Home from './components/Home/index.js';
import Artists from './components/Artists/index.js';
import Register from './components/Register/index.js';

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
    return (
      <Router>
        <Background />
        <main>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home isDesktop={this.state.isDesktop}/>
            </Route>
            <Route path="/artists">
              <Artists isDesktop={this.state.isDesktop}/>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
          <Footer />
        </main>
      </Router>
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
    const backgroundImage = require('./assets/img/' + backgroundImages[random]);

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

export default App;
