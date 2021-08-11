
function About({ resumeData }) {
  const {name, imageUrl, bio, phone, email} = resumeData;


  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img
            className="profile-pic"
            src={imageUrl}
            alt="Milko Uzunov Profile Pic"
          />
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>

          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <br />
                <span>{phone}</span>
                <br />
                <span>{email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
