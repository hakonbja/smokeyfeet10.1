import React, { useState } from 'react';
import ArtistsList from '../ArtistsList/index';
import styles from './styles.module.scss';

const ArtistsMenu = (props) => {
  const [openGroup, setOpenGroup] = useState("Teacher");
  
  let openGroupArtists = [];
  if (props.artists) {
    openGroupArtists = props.artists.filter(artist => artist.role === openGroup);
  }
  

  return (
    <div className={styles.menu}>
      <h1>Artists</h1>
      {props.artists &&
        <div className={styles.group}>
          <ArtistsGroup openGroup={openGroup} setOpenGroup={setOpenGroup} filter="Teacher" heading="Teachers"/>
          <ArtistsGroup openGroup={openGroup} setOpenGroup={setOpenGroup} filter="Band" heading="Bands"/>
          <ArtistsGroup openGroup={openGroup} setOpenGroup={setOpenGroup} filter="DJ" heading="DJs"/>
          <ArtistsGroup openGroup={openGroup} setOpenGroup={setOpenGroup} filter="Other" heading="Other"/>
        </div>
      }
      <div>
        <ArtistsList artists={openGroupArtists} />
      </div>
    </div>
  );
}

const ArtistsGroup = (props) => {
  let style;
  if (props.openGroup === props.filter) {
    style = styles.active;
  }

  return (
    <h2 className={style} onClick={() => props.setOpenGroup(props.filter)}>{props.heading}</h2>
  )
}


export default ArtistsMenu;