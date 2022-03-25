import React, { useState, useRef, useEffect } from "react";
import { Modal, message } from "antd";
import { logout, refreshToken } from "./services";

export default function ExpiredTokenModal({ visible, setVisible, resetTimerTotal, stopIncrementTotal }) {
  const [timer, setTimer] = useState(600);

  const increment = useRef(null);

  const handleStart = () => {
    increment.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };


  useEffect(() => {
    if(visible) {
      handleStart();
    }
  }, [visible]);



  const handleLogout = () => {
    logout()
    .then(res => {
      message.success(res);
    })
    .catch(err => {
      message.error(`${err}`);
    });
    clearInterval(increment.current);
    stopIncrementTotal();
    resetTimerTotal();
    setTimer(600);
    setVisible(false);
  };

  const handleReset = () => {
    refreshToken()
    .then(res => {
      message.success(res);
      resetTimerTotal();
      clearInterval(increment.current);
      setTimer(600);
      setVisible(false);
    })
    .catch(err => {
      message.error(`${err}`);
    });

  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes} : ${getSeconds}`;
  };
  return (
    <Modal
      title="Expired token"
      className="expired-token-modal"
      centered
      visible={true}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <div className="stopwatch-card">
        <div className="content">
          <p>Access token expired after: </p>
          <p>{timer <= 600 && formatTime(timer)}</p>
        </div>
        <div className="buttons">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </Modal>
  );
}
