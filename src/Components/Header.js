import { Link } from "react-scroll";
import { useState } from "react";

import Social from "./Social";

function Header({ resumeData }) {
  const { name, occupation, social } = resumeData;
  const [viewNav, setViewNav] = useState(false);

  const viewNavHandler = () => {

    if(viewNav) {
      setViewNav(false);
    } else {
      setViewNav(true);
    }
  }

  return (
    <header id="home">
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
                  <Social key={x.name} name={x.name} url={x.url} />
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
          <i className="icon-down-circle"></i>
        </Link>
      </p>
    </header>
  );
}

export default Header;
