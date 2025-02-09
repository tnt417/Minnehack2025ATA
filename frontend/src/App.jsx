import { useState } from 'react'
import Profile from "./pages/Profile";  // Your profile component
import SignupLogin from "./pages/SignupLogin";  // Example home component
import NavBar from "./pages/components/NavBar"
import GroupList from "./pages/GroupList"
import CreateGroup from "./pages/CreateGroup"
import ChallengePage from "./pages/ChallengePage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import JudgingPage from './pages/JudgingPage';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/explore-groups" element={<GroupList myGroups={false}/>} />
        <Route path="/my-groups" element={<GroupList myGroups={true}/>} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/judge" element={<JudgingPage />} />
      </Routes>
    </Router>
  );
}

export default App
