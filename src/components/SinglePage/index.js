import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import univ from '../../styles/universal.module.scss';
import fade from './fade.module.scss';

const SinglePage = () => {
  const [pageObject, setPageObject] = useState();
  const [showContent, setShowContent] = useState(false);
  const [show404, setShow404] = useState(false);
  const { pageName } = useParams();

  useEffect(() => {
    fetchPage(pageName, setPageObject, setShowContent, setShow404);
  }, [pageName]);
  
  return (
    <div className={univ.singlePage}>
      <div className={univ.background}>
        <TransitionGroup component={null}>
          {showContent && (
            <CSSTransition
              classNames={fade}
              timeout={2200}
              unmountOnExit
            >
            <div className={styles.content}>
              <h1 className={univ.heading}>{pageObject.title.rendered}</h1>
              <div
                dangerouslySetInnerHTML={{__html: pageObject.content.rendered}}
              >
              </div>
            </div>
            </CSSTransition>
          )}
          {show404 && (
            <CSSTransition
            classNames={fade}
            timeout={2100}
            unmountOnExit
          >
            <Error404 />
          </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  );
}

const Error404 = () => {
  return (
    <div>
      <h1 className={styles.heading}>Oops...</h1>
      <h2>Page not found (404)</h2>
    </div>
  );
}

const fetchPage = (pageName, setPageObject, setShowContent, setShow404) => {
  let url;
  if (window.location.host.startsWith('localhost')) {
    url = "http://localhost/smokeyfeet/wp/wp-json/wp/v2/pages";
  } else {
    url = "https://www.smokeyfeet.com/wp/wp-json/wp/v2/pages";
  }

  fetch(url)
  .then(response => response.json())
  .then(data => {    
    const page = data.find(item => {
      const title = item.slug;
      return title === pageName;
    });
    if (page) {
      setPageObject(page);
      setShowContent(true);
    } else {
      setShow404(true);
    }
  })

}

export default SinglePage;