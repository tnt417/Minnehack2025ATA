import { useEffect, useState } from 'react'
import Profile from "./pages/Profile";  // Your profile component
import SignupLogin from "./pages/SignupLogin";  // Example home component
import NavBar from "./pages/components/NavBar"
import GroupList from "./pages/GroupList"
import CreateGroup from "./pages/CreateGroup"
import ChallengePage from "./pages/ChallengePage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import JudgingPage from './pages/JudgingPage';
import GroupInfo from './pages/GroupInfo';
import JoinGroup from './pages/JoinGroup';
import ResultsPage from './pages/ResultsPage';
import backend from "./backend"

function App() {
  const isLoggedIn = () => {return authToken != ""}
  // const isLoggedIn = () => true;

  //

  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  async function validateAuthToken(at){
    console.log(at)

    var res = await backend.get("/verify-token?auth=" + at)

    console.log(res)

    if(!res.data.success)
    {
      setAuthToken("")
    }
  }

  useEffect(() => {
    const at = localStorage.getItem("authToken")
    const uid = localStorage.getItem("userId")

    if(at){
      setAuthToken(at)
      validateAuthToken(at)
    }
    if(uid) setUserId(uid)
  }, [])

  return (
    <Router>
      <NavBar loggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/" element={<Navigate to="/auth"/>} />
        <Route path="/auth" element={isLoggedIn() ? <Navigate to="/my-groups"/> : <SignupLogin setInfo={
          (token, userId) => {
            setAuthToken(token);
            setUserId(userId);
            localStorage.setItem("authToken", token);
            localStorage.setItem("userId", userId);
          }
          }/>} />
        <Route path="/explore-groups" element={isLoggedIn() ? <GroupList myGroups={false} authToken={authToken}/> : <Navigate to="/auth"/>} />
        <Route path="/my-groups" element={isLoggedIn() ? <GroupList myGroups={true} authToken={authToken}/> : <Navigate to="/auth"/>} />
        <Route path="/create-group" element={isLoggedIn() ? <CreateGroup authToken={authToken} /> : <Navigate to="/auth"/>} />
        <Route path="/challenge" element={isLoggedIn() ? <ChallengePage auth={authToken} /> : <Navigate to="/auth"/>} />
        <Route path="/judge" element={isLoggedIn() ? <JudgingPage userId={userId}/> : <Navigate to="/auth"/>} />
        <Route path="/group-info" element={isLoggedIn() ? <GroupInfo /> : <Navigate to="/auth"/>} />
        <Route path="/join" element={<JoinGroup authToken={authToken} />} />
        <Route path="/results" element={isLoggedIn() ? <ResultsPage/> : <Navigate to="/auth"/>} />
      </Routes>
    </Router>
  );
}

export default App
