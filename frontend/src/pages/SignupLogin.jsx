import React, { useState } from "react";

function SignupLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen mt-[-50px] z-[-50]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Create Account" : "Log In"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
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
              ${isFormValid ? "bg-[#FFBF00] hover:bg-[#D9A300] text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
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
