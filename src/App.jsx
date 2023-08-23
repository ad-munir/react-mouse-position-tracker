/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import "./App.css";
import { useEffect, useState } from "react";


const withMousePosition = (WrappedComponent) => {
  
  return (props) => {
    const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMousePositionChange = (e) => {
      // Use e.clientX and e.clientY to access the mouse position on the screen
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMousePositionChange);

    return () => {
      window.removeEventListener("mousemove", handleMousePositionChange);
    };
  }, []);
    
    return <WrappedComponent {...props} mousePosition={ mousePosition}/>
  }
}

const PanelMouseLogger = ({mousePosition}) => {
  // The below if statement can be removed after the render props pattern is implemented
  if (!mousePosition) {
    return null;
  }
  return (
    <div className="BasicTracker">
      <p>Mouse position:</p>
      <div className="Row">
        <span>x: {mousePosition.x}</span>
        <span>y: {mousePosition.y}</span>
      </div>
    </div>
  );
};

const PointMouseLogger = ({mousePosition}) => {
  // The below if statement can be removed after the render props pattern is implemented
  if (!mousePosition) {
    return null;
  }
  return (
    <p>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  )
};


const PointMouseTracker = withMousePosition(PointMouseLogger);
const PanelMouseTracker = withMousePosition(PanelMouseLogger);

function App() {
  return (
    <div className="App">
      <PanelMouseTracker />
      <PointMouseTracker />
    </div>
  );
}

export default App;
