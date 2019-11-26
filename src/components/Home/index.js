import React from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const Home = (props) =>(
  
  <div className={styles.home}>
    {props.isDesktop ?
      <div className={styles.ribbonWrapper}>
        <div className={styles.ribbon}>
          <div className={styles.ribbonContent}>
            <h3><span className={styles.orange}>5 parties</span> with live music</h3>
            <h3>2 days of <span className={styles.orange}>workshops</span></h3>
            <h3>register on <span className={styles.orange}>january 11th</span></h3>
          </div>
        </div>
      </div>
      :
      <div className={styles.textContainer}>
        <h3><span className={styles.orange}>5 parties</span> with live&nbsp;music</h3>
        <h3>2 days of <span className={styles.orange}>workshops</span></h3>
      </div>}


      <div className={styles.dateWrapper}>
        <div className={styles.border}>
          <div className={styles.date}>
            <h1>21-25</h1>
            <h1>may</h1>
            <h1>2020</h1>
          </div>
          <div className={styles.line}></div>
          <div className={styles.location}>
            <h2>Amsterdam</h2>
          </div>
        </div>
      </div>

    {!props.isDesktop && (
      <div className={styles.textContainer}>
        <h3>register on <span className={styles.orange}>january&nbsp;11th</span></h3>
      </div>
    )}

  </div>
)

Home.propTypes = {
isDesktop: PropTypes.bool.isRequired,
}

export default Home;