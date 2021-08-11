import Project from "./Project";

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
            {portfolio?.projects
              ? portfolio?.projects.map((x) => (
                  <Project key={x._id} project={x} />
                ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
