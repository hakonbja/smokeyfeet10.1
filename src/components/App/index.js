import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../styles/style.scss';
import styles from './styles.module.scss';
import './transitions.scss';
import Header from '../Header/index.js';
import Content from '../Content/index';
import Footer from '../Footer/index.js';

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
        <main>
          <Background />
          <Header />
          <Content isDesktop={this.state.isDesktop} />
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

export default App;
