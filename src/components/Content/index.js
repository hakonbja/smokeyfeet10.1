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
  
  // const { key } = location;    
  const currentLocation = location.pathname.split("/")[1];
  const currentClass = (currentLocation === "") ? "home" : currentLocation;
  
  const timeout = { enter: 0, exit: 0 };

  return (
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
              <Home {...props} isDesktop={isDesktop}/>
            }/>
          <Route path="/artists"
            render={(props) =>
              <Artists {...props} isDesktop={isDesktop}/>
            }/>
          <Route path="/register" exact component={Register} />
          <Route path="/:pageName" component={SinglePage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(Content);