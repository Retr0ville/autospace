import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import HomeList from './pages/HomeList';
import CarDetail from './pages/CarDetail';
import PostCar from './pages/PostCar';

const App = () => {
    return (
        <div className="d-flex flex-column ">
            <Header />
            <Routes>
                <Route path="/" element={<HomeList />} />
                <Route path="/car/:id" element={<CarDetail />} />
                <Route path="/sell" element={<PostCar />} />
            </Routes>
        </div>
    )
};

export default App;
