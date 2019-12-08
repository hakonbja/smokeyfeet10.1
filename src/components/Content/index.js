import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from './styles.module.scss';
import Home from '../Home/index.js';
import Artists from '../Artists/index.js';
import Register from '../Register/index.js';
import SinglePage from '../SinglePage/index';

const Content = (props) => {  
  const { location } = props;
  let isDesktop = props.isDesktop; // for some reason using props.isDesktop in the Route returns undefined
   
  const timeout = isDesktop ? { appear: 1200, enter: 2250, exit: 1050 } : 300;

  const getClass = ((isDesktop, location) => {
    if (!isDesktop) {
      return "mobile";
    }
    const includedPages = ["home", "register", "artists"];
    let currentLocation = location.pathname.split("/")[1];
    if (currentLocation === "") currentLocation = "home";

    if (includedPages.indexOf(currentLocation) < 0) {
      return "singlePage";
    }
    
    return currentLocation;
  })(isDesktop, location);

  const key = location.pathname.split("/")[1];
  
  return (
    <TransitionGroup
      className={styles.gridContainer}
    >
      <CSSTransition
        key={key}
        timeout={timeout}
        classNames={getClass}
        appear={true}
      >
        <Switch location={location}>
          <Route path="/" exact
            render={(props) => 
              <Home {...props} isDesktop={isDesktop}/>
            }/>
          <Route path="/artists"
            render={(props) =>
              <Artists {...props} isDesktop={isDesktop}/>
            }/>
          <Route path="/register" exact 
            render={(props) =>
            <Register {...props} isDesktop={isDesktop}/>
          }/>
          <Route path="/:pageName" component={SinglePage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(Content);