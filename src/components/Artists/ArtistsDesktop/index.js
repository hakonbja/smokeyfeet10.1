import React, { useState } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import styles from './styles.module.scss';
import ArtistInfo from '../ArtistInfo/index';

const ArtistsDesktop = (props) => {
  
  return (
    <div className={styles.artists}>
      <ArtistsMenu artists={props.artists}/>
      <Redirect to="/artists/alice-felipe" />
      <Route path="/artists/:slug">
        <ArtistInfo artists={props.artists}/>
      </Route>
    </div>  
  );
}

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
          <ArtistsGroup artists={props.artists} toggleGroup={toggleTeachers} isOpen={isTeachersOpen} filter="Teacher" role="Teachers" />
          <ArtistsGroup artists={props.artists} toggleGroup={toggleBands} isOpen={isBandsOpen} filter="Band" role="Bands"/>
          <ArtistsGroup artists={props.artists} toggleGroup={toggleDjs} isOpen={isDjsOpen} filter="DJ" role="DJs"/>
          <ArtistsGroup artists={props.artists} toggleGroup={toggleOther} isOpen={isOtherOpen} filter="Other" role="Other"/>
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
        {props.role}
        <span className={styles.icon}>{icon}</span>
      </h2>
      {props.isOpen &&
        <ArtistsList artists={filteredArtists}/>
      }
    </div>
  );
}

const ArtistsList = (props) => {
  let list = props.artists.map((artist, i) => {
    return (
      <NavLink
        to={"/artists/" + artist.slug}
        key={i}
        activeClassName={styles.active}  
      >
        <li
          dangerouslySetInnerHTML={{__html: artist.name}}
          >
        </li>
      </NavLink>
    )
  });

  return (
    <ul className={styles.list}>
      {list}
    </ul>
  )
}

export default ArtistsDesktop;