import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

const ArtistInfo = (props) => {
  const { slug } = useParams();

  if (props.artists && props.artists.length > 0) {
    const artist = props.artists.find(artist => artist.slug === slug);
    
    return (
      <div className={styles.info}>
        <Bio bio={artist.bio}/>
        <Image image={artist.img}/>
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
      <div className={styles.bioWrapper}>
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
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <img src={props.image} alt={"Photo of " + props.name}/>
          </div>
        </div>
    )
  }
  return null;
}

export default ArtistInfo;