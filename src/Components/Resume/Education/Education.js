function Education({ education }) {
  return (
    <div >
      <h3>
      <p >
        {education.degree} <span>&bull; </span>
        <em className="date">{education.graduated}</em>
      </p>
      </h3>
      <p className="info">{education.school}</p>
      
    </div>
  );
}

export default Education;
