import React from 'react';
import { Routes , Route } from 'react-router-dom'; // Import the required components from React Router
import Home from "../src/page/Home";

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
      </Routes>
  );
}

export default App;
