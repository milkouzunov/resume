import ProjectSlider from "./ProjectSlider";

function Portfolio({portfolio}) {
  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Check Out Some of My Works.</h1>

          <div
            id="portfolio-wrapper"
            className="bgrid-quarters s-bgrid-thirds cf"
          >
            <ProjectSlider projects={portfolio.projects}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
