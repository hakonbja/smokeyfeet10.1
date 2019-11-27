import React, { useState } from 'react';
import styles from './styles.module.scss';
import ArtistsList from '../ArtistsList/index';

const ArtistsMenu = (props) => {
  const [isTeachersOpen, toggleTeachers] = useState(true);
  const [isBandsOpen, toggleBands] = useState(true);
  const [isDjsOpen, toggleDjs] = useState(true);
  const [isOtherOpen, toggleOther] = useState(true);
  
  return (
    <div className={styles.menu}>
      <h1>Artists</h1>
      {props.artists &&
        <div className={styles.groups}>
          <ArtistsGroup artists={props.artists} toggleGroup={toggleTeachers} isOpen={isTeachersOpen} filter="Teacher" heading="Teachers" />
          <ArtistsGroup artists={props.artists} toggleGroup={toggleBands} isOpen={isBandsOpen} filter="Band" heading="Bands"/>
          <ArtistsGroup artists={props.artists} toggleGroup={toggleDjs} isOpen={isDjsOpen} filter="DJ" heading="DJs"/>
          <ArtistsGroup artists={props.artists} toggleGroup={toggleOther} isOpen={isOtherOpen} filter="Other" heading="Other"/>
        </div>
      }
    </div>
  );
}

const ArtistsGroup = (props) => {
  let filteredArtists = props.artists.filter(artist => artist.role === props.filter);
  let icon = props.isOpen ? "-" : "+";
  return (
    <div className={styles.group}>
      <h2 onClick={() => props.toggleGroup(!props.isOpen)}>
        {props.heading}
        <span className={styles.icon}>{icon}</span>
      </h2>
      {props.isOpen &&
        <ArtistsList artists={filteredArtists}/>
      }
    </div>
  );
}

export default ArtistsMenu;