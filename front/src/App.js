import './App.css';

import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";

import FrontPage from './views/frontPage';
import PlaylistComponent from './components/playlistMainComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
