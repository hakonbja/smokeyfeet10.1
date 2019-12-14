import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import fade from './fade.module.scss';

const SinglePage = () => {
  const [pageObject, setPageObject] = useState();
  const [showContent, setShowContent] = useState(false);
  const { pageName } = useParams();

  useEffect(() => {
    fetchPage(pageName, setPageObject, setShowContent);
  }, [pageName]);
  
    return (
      <div className={styles.singlePage}>
        <div className={styles.background}>
          <TransitionGroup component={null}>
            {showContent && (
              <CSSTransition
                classNames={fade}
                timeout={2100}
                unmountOnExit
              >
              <div className={styles.content}>
                <h1 className={styles.heading}>{pageObject.title.rendered}</h1>
                <div
                  dangerouslySetInnerHTML={{__html: pageObject.content.rendered}}
                >
                </div>
              </div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
      </div>
    );

  
}

const fetchPage = (pageName, setPageObject, setShowContent) => {
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
    setPageObject(page);
    setShowContent(true);
  })

}

export default SinglePage;