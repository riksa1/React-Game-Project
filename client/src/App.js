import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/Home.js"
import Auth from "./views/Auth.js"
import Profile from "./views/Profile.js"
import Settings from "./views/Settings.js"
import Games from "./views/Games.js"
import Game from "./views/Game.js"
import NewGame from "./views/NewGame.js"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/auth" exact element={<Auth />} />
        <Route path="/games" exact element={<Games />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/newgame" exact element={<NewGame />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/settings" exact element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
