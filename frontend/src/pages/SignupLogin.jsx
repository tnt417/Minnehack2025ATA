import React, { useState } from "react";
import backend from "../backend";

function SignupLogin({setInfo}) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const isFormValid = (!isSignUp || displayName.trim() !== "") && email.trim() !== "" && password.trim() !== "";

  async function doSignup() {
    var res = await backend.get(`/signup?email=${email}&name=${displayName}&password=${password}`)

    console.log(res)
  }

  async function doLogin() {
    var res = await backend.get(`/login?email=${email}&password=${password}`)

    setInfo(res.data.auth, res.data.userId)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!isFormValid) {
      alert("Please fill out all fields.");
      return;
    }

    // Perform signup or login logic here
    if (isSignUp) {
      doSignup()
      // Add your signup API call or logic here
    } else {
      doLogin()
      // Add your login API call or logic here
    }

    // Clear the form after submission (optional)
    setDisplayName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Create Account" : "Log In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-gray-700 font-medium">E-mail</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          {isSignUp && <div className="mb-4">
            <label className="block text-gray-700 font-medium">Display Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-lg transition duration-300 
              ${
                isFormValid
                  ? "bg-[#FFBF00] hover:bg-[#D9A300] text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupLogin;