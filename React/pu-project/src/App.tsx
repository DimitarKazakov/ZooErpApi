import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './Screens/HomeScreen';
import { LoginScreen } from './Screens/LoginScreen';
import { ColorScreen } from './Screens/View/ColorScreen';
import { CarMakeScreen } from './Screens/View/CarMakeScreen';
import { CarLevelScreen } from './Screens/View/CarLevelScreen';
import { ConditionScreen } from './Screens/View/ConditionScreen';
import { FuelTypeScreen } from './Screens/View/FuelTypeScreen';
import { BodyStyleScreen } from './Screens/View/BodyStyleScreen';
import { ExtraScreen } from './Screens/View/ExtraScreen';
import { TunningScreen } from './Screens/View/TunningScreen';
import { CarScreen } from './Screens/View/CarScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/colors" element={<ColorScreen />} />
        <Route path="/carMakes" element={<CarMakeScreen />} />
        <Route path="/carLevels" element={<CarLevelScreen />} />
        <Route path="/conditions" element={<ConditionScreen />} />
        <Route path="/fuelTypes" element={<FuelTypeScreen />} />
        <Route path="/bodyStyles" element={<BodyStyleScreen />} />
        <Route path="/extras" element={<ExtraScreen />} />
        <Route path="/tunnings" element={<TunningScreen />} />
        <Route path="/cars" element={<CarScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
