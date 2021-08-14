
function Course ({course}) {
    return (
        <div>
            <h3><p >{course.courseTitle}<span> &bull;</span> <em className="date">{course.date}</em></p></h3>
            <p className="info">{course.university}</p>
        </div>
    );
}

export default Course;