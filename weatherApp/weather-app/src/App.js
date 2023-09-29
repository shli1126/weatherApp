import './App.css';
import Header from './components/header/Header'
import Home from './components/home/Home'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import FavoritePage from "./components/favorite/FavoritePage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorite" element={<FavoritePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
