import { useState } from "react";
import Slider from "react-slick";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const NextArrow = ({ onClick }) => {
  return (
    <div className="nextArrow" onClick={onClick}>
      <BsChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="prevArrow" onClick={onClick}>
      <BsChevronLeft />
    </div>
  );
};

const ProjectSlider = ({ projects, slidesToShow = 3 }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    centerMode: true,
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: slidesToShow,
    centerPadding: "0",
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <NextArrow onClick />,
    prevArrow: <PrevArrow onClick />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const templateProjects = projects?.map((project, idx) => {
    return (
      <div
        className={idx === imageIndex ? "activeSlide" : "slide"}
        key={project._id}
      >
        <div className="slideWrapper">
          <div className="item-wrap">
            <a href={project.url} target="_blank" rel="noreferrer">
              <img alt="certificate" src={project.imageUrl} />
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{project.title}</h5>
                  <p>{project.category}</p>
                  <div className="link-icon">
                    <i className="fa fa-link"></i>
                  </div>
                </div>
                <div className="repository">
                  <a
                    href={project.repositoryUrl}
                  >
                    View repository
                  </a>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <Slider {...settings}>{templateProjects}</Slider>;
};

export default ProjectSlider;
