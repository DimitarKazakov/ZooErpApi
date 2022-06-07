import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './Screens/HomeScreen';
import { LoginScreen } from './Screens/LoginScreen';
import { AnimalScreen } from './Screens/View/AnimalScreen';
import { CageScreen } from './Screens/View/CageScreen';
import { EventScreen } from './Screens/View/EventScreen';
import { FoodScreen } from './Screens/View/FoodScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/foods" element={<FoodScreen />} />
        <Route path="/events" element={<EventScreen />} />
        <Route path="/cages" element={<CageScreen />} />
        <Route path="/animals" element={<AnimalScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
