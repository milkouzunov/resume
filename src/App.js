import { useEffect, useState, useRef } from "react";
import { Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Portfolio from "./Components/Portfolio/Portfolio";
import SignIn from "./Components/SignIn";
import ExpiredTokenModal from "./expiredTokenModal";
import { message } from "antd";
import { logout } from "./services";

import "./App.css";

import Loader from "./Components/Loader";
import getFullData from "./utils/getFullData";
import AuthContext from "./AuthContext";


function App() {
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('access_token');
  const timer = localStorage.getItem('timer');

  const [visible, setVisible] = useState(false)
  const [timerTotal, setTimerTotal] = useState(3600);
  
  const incrementTotal = useRef(null);

  useEffect(() => {
    if(incrementTotal.current === null && (timer && timer < timerTotal)) {
      setTimerTotal(timer);
      handleStartTimer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('timer', timerTotal);

    if(timerTotal === 600) {
      setVisible(true);
    }
    if(timerTotal === 0) {
      logout()
      .then(res => {
        message.success(res);
        clearInterval(incrementTotal.current);
        setTimerTotal(3600);
      })
      .catch(err => {
        message.error(`${err}`);
      });
    }
  }, [timerTotal]);


  const handleStartTimer = () => {
    incrementTotal.current = setInterval(() => {
      setTimerTotal((timerTotal) => timerTotal - 1);
    }, 1000);
  };

  useEffect(() => {
    setIsLoading(true);
    getFullData()
    .then((data) => {
      setResumeData(data);
      setIsLoading(false);
    })
    .catch((err) => {
      message.error(`${err}`);
    })
  }, [])

  return isLoading ? (
    <div className="loader">
      <Loader/>
    </div>
  ) : (
    <AuthContext.Provider value={token !== null}>
      <div className="App">
        <Route path="/login" render={() => <SignIn setTimerTotal={setTimerTotal} handleStartTotal={handleStartTimer}/>}/>
        <Header aboutMe={Object.keys(resumeData).length ? resumeData.find((d) => d.hasOwnProperty('aboutMe')).aboutMe : {}} />
        <About resumeData={Object.keys(resumeData).length ? resumeData.find((d) => d.hasOwnProperty('aboutMe')).aboutMe : {}} />
        <Resume resume={Object.keys(resumeData).length ? resumeData.find((d) => d.hasOwnProperty('resumeData')).resumeData : {}} />
        <Portfolio portfolio={Object.keys(resumeData).length ? resumeData.find((d) => d.hasOwnProperty('portfolio')).portfolio : {}} />
        <Footer social={Object.keys(resumeData).length ? resumeData.find((d) => d.hasOwnProperty('aboutMe')).aboutMe.social : {}} />
        {visible && (
          <ExpiredTokenModal
            visible={visible}
            setVisible={setVisible}
            stopIncrementTotal={() => clearInterval(incrementTotal.current)}
            resetTimerTotal={() => setTimerTotal(3600)}/>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
