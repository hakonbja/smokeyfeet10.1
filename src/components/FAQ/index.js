import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import univ from '../../styles/universal.module.scss';
import fade from './fade.module.scss';

const FAQ = () => {
  const [FAQs, setFAQs] = useState();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetchFAQs(setFAQs, setShowContent);
  }, []);
  
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
                <h1 className={univ.heading}>FAQ</h1>
                {showContent && FAQs.map((faq, i) => {
                  return <SingleFAQ FAQ={faq} key={i} />
                  })
                }
              </div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
      </div>
    );
}

const SingleFAQ = (props) => {
  return (
    <div className={styles.singleFAQ}>
      <div className={styles.question}>
        <h2>{props.FAQ.question}</h2>
      </div>
      <div
        className={styles.answer}
        dangerouslySetInnerHTML={{__html: props.FAQ.answer}}
      >
      </div>
    </div>
  )
}

const fetchFAQs = (setFAQs, setShowContent) => {
  let url;
  if (window.location.host.startsWith('localhost')) {
    url = "http://localhost/smokeyfeet/wp/wp-json/wp/v2/faq?per_page=100&_embed";
  } else {
    url = "https://www.smokeyfeet.com/wp/wp-json/wp/v2/faq?per_page=100&_embed";
  }

  fetch(url)
  .then(response => response.json())
  .then(data => {    
    let allFAQs = data.map(faq => {
      return ({
        question: faq.title.rendered,
        answer: faq.content.rendered,
      })
    })
    const allFAQsSorted = allFAQs.sort((a, b) => a.question.toUpperCase() > b.question.toUpperCase() )
    setFAQs(allFAQsSorted);
    setShowContent(true);
  })

}

export default FAQ;