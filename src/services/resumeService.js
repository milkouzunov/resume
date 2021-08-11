const url = process.env.REACT_APP_API_URL;

async function getResumeData() {
   
    try {
        const data = await fetch(`${url}/main`);
        return data.json();
    } catch (err) {
        console.error(err);
    }
}

export {
  getResumeData,
};
