import Education from "./Education";
import Course from "./Course";
import Skill from "./Skill";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useContext } from "react";
import FormEdit from "./ModalForm/ModalForm";
import AuthContext from "../../AuthContext";
import TestModal from "./ModalForm/testModal";

function Resume({ resume }) {
  const [currentPageSkills, setCurrentPageSkills] = useState(1);
  const [hideCourses, setHideCourses] = useState(false);
  const [hideSkills, setHideSkills] = useState(false);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [currentPageCourses, setCurrentPageCourses] = useState(1);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formType, setFormType] = useState(false);
  const auth = useContext(AuthContext);

  const numberPerPage = 5;
  const numberPerPageCourses = 3;

  useEffect(() => {
    skillsSeeMore();
  }, [currentPageSkills]);
  useEffect(() => {
    coursesSeeMore();
  }, [currentPageCourses]);

  const skillsSeeMore = () => {
    const indexStart = (currentPageSkills - 1) * numberPerPage;
    const indexEnd = indexStart + numberPerPage;
    const result = resume?.skills?.slice(indexStart, indexEnd) || [];
    if (result.length > 0 && !hideSkills && currentSkills.length < resume?.skills?.length) {
      setCurrentSkills((state) => [...state, ...result]);
    } else if (hideSkills) {
      setCurrentSkills(result);
      setHideSkills(false);
    }
  }

  const coursesSeeMore = () => {
    const indexStart = (currentPageCourses - 1) * numberPerPageCourses;
    const indexEnd = indexStart + numberPerPageCourses;
    const result = resume?.courses?.slice(indexStart, indexEnd) || [];
    if (result.length > 0 && !hideCourses && currentCourses.length < resume?.courses?.length) {
      setCurrentCourses((state) => [...state, ...result]);
    } else if (hideCourses) {
      setCurrentCourses(result);
      setHideCourses(false);
    }
  }

  const handleHideCourses = () => {
    setHideCourses(true);
    setCurrentPageCourses(1);
  }

  const handleHideSkills = () => {
    setHideSkills(true);
    setCurrentPageSkills(1);
  }

  function mapSkills() {
    return currentSkills.map((x) => <Skill key={x._id} skill={x} />);
  }

  function mapCourses() {
    return currentCourses.map((x) => <Course resumeId={resume._id} key={x._id} course={x} />);
  }
  return (
    <section id="resume">
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
          {auth && (
            <p className="action">
              <FontAwesomeIcon icon={faPlusCircle} onClick={() => {
                setVisible(true);
                setFormType(true);
              }} />
            </p>
          )}
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">
              {resume?.education
                ? resume?.education.map((x) => (
                    <Education key={x._id} resumeId={resume._id} education={x} />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>

      <div className="row courses">
        <div className="three columns header-col">
          <h1>
            <span>Courses</span>
          </h1>
          {auth && (
            <p className="action">
              <FontAwesomeIcon icon={faPlusCircle} onClick={() => {
                setVisible(true);
                setFormType(false);
              }} />
            </p>
          )}
        </div>

        <div className="courses nine columns main-col">
          {resume?.courses ? mapCourses() : null}
          {resume?.courses?.length > numberPerPageCourses &&
          currentCourses.length < resume?.courses?.length ? (
            <div className="see-more-btn">
              <Button onClick={() => setCurrentPageCourses(currentPageCourses + 1)}>
                See More
              </Button>
            </div>
          ) : null}
          {resume?.courses?.length > numberPerPageCourses &&
          currentCourses.length === resume?.courses?.length ? (
            <div className="see-more-btn">
              <Button onClick={handleHideCourses}>
                Hide
              </Button>
            </div>
          ) : null }
        </div>
      </div>

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
          {auth && (
            <p className="action">
              <FontAwesomeIcon icon={faPlusCircle}  />
            </p>
          )}
        </div>

        <div className="nine columns main-col">
          <div className="skills-wrapper">
            <ul className="skills">
              {resume?.skills ? mapSkills() : null}
              {resume?.skills?.length > numberPerPage &&
              currentSkills.length < resume?.skills?.length ? (
                <li className="see-more-btn">
                  <Button onClick={() => setCurrentPageSkills(currentPageSkills + 1)}>
                    See More
                  </Button>
                </li>
              ) : currentSkills.length === resume?.skills?.length &&
                resume?.skills?.length > numberPerPage ? (
                <li className="see-more-btn">
                  <Button onClick={handleHideSkills}>
                    Hide
                  </Button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      <FormEdit 
        visible={visible}
        resumeId={resume._id}
        setVisible={setVisible}
        education={formType}
        setFormType={setFormType}
      />
      {/* <TestModal/> */}
    </section>
  );
}

export default Resume;
