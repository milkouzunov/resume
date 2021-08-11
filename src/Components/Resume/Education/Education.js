function Education({ education }) {
  console.log(education);
  return (
    <div >
      <h3>{education.school}</h3>
      <p className="info">
        {education.degree} <span>&bull;</span>
        <em className="date">{education.graduated}</em>
      </p>
    </div>
  );
}

export default Education;
