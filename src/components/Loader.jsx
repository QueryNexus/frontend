import React from 'react';
import { HashLoader } from 'react-spinners';
import "./styles/Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <HashLoader color="#36d7b7" />
    </div>
  );
}

export default Loader;