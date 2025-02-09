import { useEffect, useState } from 'react'
import Profile from "./pages/Profile";  // Your profile component
import SignupLogin from "./pages/SignupLogin";  // Example home component
import NavBar from "./pages/components/NavBar"
import GroupList from "./pages/GroupList"
import CreateGroup from "./pages/CreateGroup"
import ChallengePage from "./pages/ChallengePage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import JudgingPage from './pages/JudgingPage';
import LandingPage from './pages/LandingPage';

function App() {
  const isLoggedIn = () => {return authToken != ""}
  // const isLoggedIn = () => true;

  //

  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    const at = sessionStorage.getItem("authToken")
    const uid = sessionStorage.getItem("userId")

    if(at) setAuthToken(at)
    if(uid) setUserId(uid)
  }, [])

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={isLoggedIn() ? <Navigate to="/my-groups"/> : <SignupLogin setInfo={
          (token, userId) => {
            setAuthToken(token);
            setUserId(userId);
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userId", userId);
          }
          }/>} />
        <Route path="/explore-groups" element={isLoggedIn() ? <GroupList myGroups={false} authToken={authToken}/> : <Navigate to="/auth"/>} />
        <Route path="/my-groups" element={isLoggedIn() ? <GroupList myGroups={true} authToken={authToken}/> : <Navigate to="/auth"/>} />
        <Route path="/create-group" element={isLoggedIn() ? <CreateGroup authToken={authToken} /> : <Navigate to="/auth"/>} />
        <Route path="/challenge" element={isLoggedIn() ? <ChallengePage auth={authToken} /> : <Navigate to="/auth"/>} />
        <Route path="/judge" element={isLoggedIn() ? <JudgingPage userId={userId}/> : <Navigate to="/auth"/>} />
      </Routes>
    </Router>
  );
}

export default App
