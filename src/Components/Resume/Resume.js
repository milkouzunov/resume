import Education from "./Education";
import Course from "./Course";
import Skill from "./Skill";

function Resume({ resume }) {

  return (
    <section id="resume">
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">
            {resume?.education
              ? resume?.education.map((x) => (
                  <Education key={x._id} education={x}/>
                ))
              : null}
            </div>
          </div>
        </div>
      </div>

      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Courses</span>
          </h1>
        </div>

        <div className="nine columns main-col">
        {resume?.courses
              ? resume?.courses.map((x) => (
                  <Course key={x._id} course={x}/>
                ))
              : null}
        </div>
      </div>

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">

          <div className="bars">
            <ul className="skills">
            {resume?.skills
              ? resume?.skills.map((x) => (
                  <Skill key={x._id} skill={x}/>
                ))
              : null}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
