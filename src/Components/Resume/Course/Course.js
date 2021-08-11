
function Course ({course}) {
   console.log(course);
    return (
        <div>
            <h3>{course.university}</h3>
            <p className="info">{course.courseTitle}<span>&bull;</span> <em className="date">{course.date}</em></p>
        </div>
    );
}

export default Course;