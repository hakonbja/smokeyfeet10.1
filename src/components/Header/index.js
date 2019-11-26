import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/white_logo.svg';
import styles from './styles.module.scss';
import { ReactComponent as TenYears } from '../../assets/img/10_year_anniversary.svg';

class Header extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          menuIsOpen: false,
      }

  }

  render() {
    return (
      <header
        className={styles.header}
        style={{top: this.props.headerTop}}
      >
        <div className={styles.left} onClick={this.props.handleMenuLinkClick}>
          <Link to="/">
            <Logo className={styles.logo}/>
            <div className={styles.text}>
            <h1 className={styles.heading}>Smokey Feet</h1>
            </div>
          </Link>
        </div>
        <div
          className={styles.tenYearsWrapper}
        >
          <Link to="/">
          <TenYears
          className={styles.tenYears}
          onClick={this.props.handleMenuLinkClick}
          />
          </Link>
        </div>
        <Navbar menuIsOpen={this.state.menuIsOpen}/>
      </header>
    )
  }
}

const Navbar = (props) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems(setMenuItems);
  }, []);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.linksList}>
        <Links
          menuItems={menuItems}
          // onClick={this.props.handleMenuLinkClick}
        />
      </ul>

      <div className={(props.menuIsOpen) ? styles.hamburgerMenuWrapperOpen : styles.hamburgerMenuWrapper}>
        <div className={styles.hamburgerMenu}
        // onClick={props.handleMenuClick}
        >
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </div>
      </div>
    </nav>
  );
}

const Links = (props) => {
  const {menuItems, onClick} = props;
  const links = menuItems.map((menuItem, i) => {
    if (menuItem.hasOwnProperty('url')) {
      return (
        <NavLink
        to={menuItem.url}
        onClick={onClick}
        key={i}
        activeClassName={styles.active}
      >
        <li>{menuItem.name}</li>
      </NavLink>
      );
    }
    return (
      <NavLink
        to={`/page:${menuItem.page_id}`}
        onClick={onClick}
        key={i}
        activeClassName={styles.active}
      >
        <li>{menuItem.name}</li>
      </NavLink>
    );
  });
  return links;
}

const fetchMenuItems = (setMenuItems) => {
  let url;
  if (window.location.host.startsWith('localhost')) {
    url = "http://localhost/smokeyfeet/wp/wp-json/wp/v2/menu";
  } else {
    url = "https://www.smokeyfeet.com/wp/wp-json/wp/v2/menu";
  }

  fetch(url)
  .then(response => response.json())
  .then(data => {
    let menuItems = data.map(menuItem => {
      let output = {
        name: menuItem.title
      }
      if (menuItem.type === "custom") {
        output.url = menuItem.url;
      } else if (menuItem.type === "post_type") {
        output.page_id = menuItem.object_id;
      }
      return output;
    });
    setMenuItems(menuItems);
  })
};

export default Header;