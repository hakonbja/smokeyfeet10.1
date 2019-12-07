import React from 'react';
import { useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from './styles.module.scss';
import transitionsBio from './transitionsBio.module.scss';
import transitionsImage from './transitionsImage.module.scss';

const ArtistInfo = (props) => {
  const { slug } = useParams();

  if (props.artists && props.artists.length > 0) {
    const artist = props.artists.find(artist => artist.slug === slug);
    const timeout = {appear: 1000, enter: 500, exit: 500};
    
    return (
      <div className={styles.info}>
        <TransitionGroup component={null}>
          <CSSTransition
            appear={true}
            key={artist.name}
            timeout={timeout}
            classNames={transitionsBio}
          >
            <Bio bio={artist.bio}/>
          </CSSTransition>
        </TransitionGroup>
        <TransitionGroup component={null}>
          <CSSTransition
            appear={true}
            key={artist.name}
            timeout={timeout}
            classNames={transitionsImage}
          >
            <Image image={artist.img}/>
          </CSSTransition>
        </TransitionGroup>
        {props.isDesktop &&
          <div className={styles.imageHover}>
            <Image image={artist.img} name={artist.name}/>
          </div>
        }
      </div>
    )
  }
  return null;
}

const Bio = (props) => {
  if (props.bio) {
    return (
      <div className={`${styles.bioWrapper} bioWrapper`}>
        <div
          className={styles.bio}
          dangerouslySetInnerHTML={{__html: props.bio}}
        >
        </div>
      </div>
    )
  }
  return null;
}

const Image = (props) => {
  if (props.image) {
    return (
        <div className={`${styles.imageWrapper} imageWrapper`}>
          <div className={styles.image}>
            <img src={props.image} alt={"Photo of " + props.name}/>
          </div>
        </div>
    )
  }
  return null;
}

export default ArtistInfo;