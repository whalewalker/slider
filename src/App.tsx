import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Home from "../src/page/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
      </Routes>
  );
}

export default App;
