import React from 'react';
import './App.css';
import {MainLayout} from "./components/MainLayout";
import {BrowserRouter as Routers} from "react-router-dom";

function App() {
    return (
        <Routers>
            <MainLayout/>
        </Routers>
    );
}

export default App;
