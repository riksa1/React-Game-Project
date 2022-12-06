import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import Profile from "./views/Profile"
import Settings from "./views/Settings"
import Games from "./views/Games"
import Game from "./views/Game"
import NewGame from "./views/NewGame"
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux"
import { setError, setMessage } from "./reducers/Messages"
import SignIn from "./views/SignIn"
import SignUp from "./views/SignUp"

const App = () => {
  const { isAuth } = useSelector(state => state.auth)
  const { error, message } = useSelector(state => state.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem("profile")) {
      dispatch({ type: "SET_AUTH", payload: JSON.parse(localStorage.getItem("profile")) })
    }
  }, [dispatch])

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
        <Route path="*" element={isAuth ? <Home /> : <SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<Game />} />
        {isAuth ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/newgame" element={<NewGame />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
