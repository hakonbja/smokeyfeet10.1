import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import styles from './styles.module.scss';
import MenuDesktop from './MenuDesktop/index';
import MenuMobile from './MenuMobile/index';
import ArtistInfo from './ArtistInfo/index';

const Artists = (props) => {
  const [artists, setArtists] = useState({info: [], isFetching: false});

  useEffect(() => {
    fetchArtists(setArtists);
  }, []);

  const ArtistsMenu = props.isDesktop ? <MenuDesktop artists={artists.info}/> : <MenuMobile artists={artists.info}/>;

  return (
    <div className={styles.artists}>
      {ArtistsMenu}
      <Redirect to="/artists/alice-felipe" />
      <Route path="/artists/:slug">
        <ArtistInfo artists={artists.info}/>
      </Route>
    </div>
  );


}

const fetchArtists = (setArtists) => {
  let url;
  if (window.location.host.startsWith('localhost')) {
    url = "http://localhost/smokeyfeet/wp/wp-json/wp/v2/artists?per_page=50&_embed";
  } else {
    url = "https://www.smokeyfeet.com/wp/wp-json/wp/v2/artists?per_page=50&_embed";
  }

  setArtists({isFetching: true})

  fetch(url)
  .then(response => response.json())
  .then(data => {
    let artistsInfo = data.map(artist => {
      let img = artist._embedded['wp:featuredmedia']  ? artist._embedded['wp:featuredmedia'][0]['source_url'] : '';
      return ({
        name: artist.title.rendered,
        bio: artist.content.rendered,
        role: artist.role[0],
        img: img,
        slug: artist.slug,
      });
    });

    artistsInfo = artistsInfo.sort( (a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });    
    setArtists({info: artistsInfo, isFetching: false});
  });
}

export default Artists;