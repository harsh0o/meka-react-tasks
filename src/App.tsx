import useState, { useEffect } from "react";
import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// 1 -> 0 , 10 , 20, 30, 40, 50
// 2 -> 0, 5 , 10, 15
// 3 -> 0, 3, 7, 10
//4 -> 0, 3, 5, 8,
function App() {
  const [loadState, setLoadState] = React.useState(false);
  const [timeToFull, setTimeToFull] = React.useState<any>(null);
  const loaderValue: any = React.useRef(10);

  const handleSubmit = (e: any) => {
    // console.log('loaderValue?.current ',loaderValue?.current?.progre);
    setLoadState(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    if(Number(formData.get("seconds"))){
      setTimeToFull(formData.get("seconds"));
    }else{
      setLoadState(false);
    }
  };

  useEffect(() => {
    if (timeToFull === 0) {
      setLoadState(false);
      setTimeToFull(null);
    } else if (timeToFull !== null) {
      const timeId = setTimeout(() => {
        setTimeToFull((prev: any) => prev - 1);
      }, 1000);
    }
  }, [timeToFull]);

  const handleKeyDown = (event: any) => {
    if(event?.key === 'Backspace'){
      return
    }
  }
  return (
    <div className="progress-container">
      <Form onSubmit={handleSubmit} className="controls">
        <Form.Control 
          name="seconds"
          type="number"
          placeholder="Enter Seconds"
          defaultValue={1}
          min={1}
          disabled={loadState}
          onKeyDown={handleKeyDown}
        />
        <Button variant="primary" type="submit" disabled={loadState}>
          Start
        </Button>
      </Form>
      <div className="progress-bar"><div className="progress-fill" style={{'width': '0%', transition: 'width linear'}}></div><span ref={loaderValue} className="progress-text">0</span></div>
    </div>
  );
}

export default App;
