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
            {social.length
              ? social.map((x) => (
                  <Social key={x.name} name={x.name} url={x.url} />
                ))
              : null}
          </ul>
        </div>
        <div id="go-top">
          <button onClick={scrollToTop} className="smoothscroll">
            <i className="icon-up-open"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
