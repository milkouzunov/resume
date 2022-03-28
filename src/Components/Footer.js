import { animateScroll as scroll } from "react-scroll";
import facebook from '../images/facebook.svg';
import instagram from '../images/instagram.svg';
import linkedin from '../images/linkedin.svg';
import github from '../images/github.svg';
import upIcon from '../images/up-icon.svg';

import Social from "./Social";

function Footer({ social }) {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

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
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">
            {social.length
              ? social.map((x) => (
                  <Social socialIcon={socialIcon} key={x.name} name={x.name} url={x.url} />
                ))
              : null}
          </ul>
        </div>
        <div id="go-top">
          <button onClick={scrollToTop} className="smoothscroll">
            <img alt="up-icon" className="scroll-up-icon" src={upIcon} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
