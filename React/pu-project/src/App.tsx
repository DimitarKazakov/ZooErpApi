import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './Screens/LoginScreen';
import { AnimalScreen } from './Screens/View/AnimalScreen';
import { CageScreen } from './Screens/View/CageScreen';
import { EventScreen } from './Screens/View/EventScreen';
import { FoodScreen } from './Screens/View/FoodScreen';
import { AnimalHomeScreen } from './Screens/AnimalHomeScreen';
import { CageHomeScreen } from './Screens/CageHomeScreen';
import { FoodHomeScreen } from './Screens/FoodHomeScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalHomeScreen />} />
        <Route path="/home/animals" element={<AnimalHomeScreen />} />
        <Route path="/home/cages" element={<CageHomeScreen />} />
        <Route path="/home/foods" element={<FoodHomeScreen />} />
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
