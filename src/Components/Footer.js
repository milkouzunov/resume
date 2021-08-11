import { animateScroll as scroll } from "react-scroll";

import Social from "./Social";

function Footer({ social }) {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">
            {social
              ? social.map((x) => (
                  <Social key={x.name} name={x.name} url={x.url} />
                ))
              : null}
          </ul>

          <ul className="copyright">
            <li>&copy; Copyright 2021 Milko Uzunov</li>
            <li>
              Design by{" "}
              <a title="Styleshout" href="http://www.styleshout.com/">
                Styleshout
              </a>
            </li>
          </ul>
        </div>
        <div id="go-top">
          <a onClick={scrollToTop} href="javascript:void(0)" className="smoothscroll">
            <i className="icon-up-open"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
