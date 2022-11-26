import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/Home.js"
import Auth from "./views/Auth.js"
import Profile from "./views/Profile.js"
import Settings from "./views/Settings.js"
import Games from "./views/Games.js"
import Game from "./views/Game.js"
import NewGame from "./views/NewGame.js"
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux"
import { setError, setMessage } from "./reducers/Messages"

const App = () => {
  const { error, message } = useSelector(state => state.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(setError(null))
    }
  }, [error, dispatch])

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(setMessage(null))
    }
  }, [message, dispatch])

  return (
    <BrowserRouter>
      <Toaster />
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
