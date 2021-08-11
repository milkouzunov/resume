const url = 'https://rest-api-resume.herokuapp.com/api/main';

async function getResumeData() {
   
    try {
        const data = await fetch(url);
        return data.json();
    } catch (err) {
        console.error(err);
    }
}

export {
  getResumeData,
};
