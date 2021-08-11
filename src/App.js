import { useEffect, useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio/Portfolio";

import "./App.css";

import * as resumeService from "./services/resumeService";
import Loader from "./Components/Loader";

function App() {
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    resumeService
      .getResumeData()
      .then((data) => {
        setResumeData(data[0]);
        setIsLoading();
      })
      .catch((err) => console.error(err));
  }, []);

  return isLoading ? (
    <div className="App">
       <Loader/>
    </div>
  ) : (
    <div className="App">
      <Header resumeData={resumeData} />
      <About resumeData={resumeData} />
      <Resume resume={resumeData.resume} />
      <Portfolio portfolio={resumeData.portfolio} />
      <Footer social={resumeData.social} />
    </div>
  );
}

export default App;
