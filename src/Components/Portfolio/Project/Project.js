function Project({ project }) {
  return (
    <div className="columns portfolio-item">
      <div className="item-wrap">
        <a href={project.url} title={project.title}>
          <img alt={project.title} src={project.imageUrl} />
          <div className="overlay">
            <div className="portfolio-item-meta">
              <h5>{project.title}</h5>
              <p>{project.category}</p>
            </div>
          </div>
          <div className="link-icon">
            <i className="fa fa-link"></i>
          </div>
        </a>
      </div>
      {project.repositoryUrl ? (
        <a href={project.repositoryUrl} title={project.title + " repository"}>
          View repository
        </a>
      ) : null}
      <br></br>
    </div>
  );
}

export default Project;
