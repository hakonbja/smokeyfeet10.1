import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

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

export default ArtistsList;