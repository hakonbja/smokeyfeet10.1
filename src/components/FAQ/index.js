import React, {useEffect, useState} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import fade from './fade.module.scss';

const FAQ = () => {
  const [FAQs, setFAQs] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetchFAQs(setFAQs, setShowContent);
  }, [])

  return (
    <div className={styles.faqs}>
      <div className={styles.background}>
        <div className={styles.content}>
          <h1>FAQs</h1>
          {showContent && FAQs.map((faq, i) => {
            return <SingleFAQ FAQ={faq} key={i} />
            })
          }
        </div>
      </div>
    </div>
  );
}

const SingleFAQ = (props) => {
  return (
    <div className={styles.singleFaq}>
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
    url = "http://localhost/smokeyfeet/wp/wp-json/wp/v2/faq";
  } else {
    url = "https://www.smokeyfeet.com/wp/wp-json/wp/v2/faq";
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
    setFAQs(allFAQs);
    setShowContent(true);
  })
}

export default FAQ;