import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import styles from './styles.module.scss';

const SinglePage = () => {
  const [pageObject, setPageObject] = useState();
  const { pageName } = useParams();

  useEffect(() => {
    fetchPage(pageName, setPageObject);
  }, [pageName]);
  
  if (pageObject) {
    return (
      <div>
        <h1>{pageObject.title.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{__html: pageObject.content.rendered}}
        >
        </div>
      </div>
    );

  }
  return (
    <h1>Fetching content...</h1>
  )
}

const fetchPage = (pageName, setPageObject) => {
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
  })

}

export default SinglePage;