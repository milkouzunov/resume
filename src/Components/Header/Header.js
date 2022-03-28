import { Link } from "react-scroll";
import { useState } from "react";

import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
import linkedin from '../../images/linkedin.svg';
import github from '../../images/github.svg';
import downIcon from '../../images/down-icon.svg';

import Social from "../Social";

function Header({ aboutMe }) {
  const { name, occupation, social } = aboutMe;
  const [viewNav, setViewNav] = useState(false);

  const viewNavHandler = () => {

    if(viewNav) {
      setViewNav(false);
    } else {
      setViewNav(true);
    }
  }

  const socialIcon = (name) => {
    let icon;
    switch (name) {
      case 'facebook':
        icon = facebook;
      break;
      case 'instagram':
        icon = instagram;
       break;
      case 'linkedin':
        icon = linkedin;
      break;
      case 'github':
        icon = github;
      break;
      default:
        return;
    }
    return <img className="social-icon" alt="social-icon" src={icon} />
  }

  return (
    <header id="home" className="home-section">
      <nav id="nav-wrap">
        <button onClick={viewNavHandler} className="mobile-btn"></button>

        <ul id="nav" onClick={viewNavHandler} className={viewNav ? "nav-view" : "nav-hide"}>
          <li>
            <Link
              activeClass="active"
              className="smoothscroll current"
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={viewNavHandler}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              className="smoothscroll"
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={viewNavHandler}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              className="smoothscroll"
              to="resume"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={viewNavHandler}
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              className="smoothscroll"
              to="portfolio"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={viewNavHandler}
            >
              Works
            </Link>
          </li>
          
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">I'm {name}</h1>
          <h3>
            <span>{occupation}</span>.
          </h3>
          <hr />
          <ul className="social">
            {social
              ? social.map((x) => (
                  <Social socialIcon={socialIcon} key={x.name} name={x.name} url={x.url} />
                ))
              : null}
          </ul>
        </div>
      </div>

      <p className="scrolldown">
        <Link
          activeClass="active"
          className="smoothscroll"
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <img className="scroll-down-icon" alt="down-icon" src={downIcon}/>
        </Link>
      </p>
    </header>
  );
}

export default Header;
