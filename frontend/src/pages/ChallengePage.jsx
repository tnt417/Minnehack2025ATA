import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChallengePage = () => {
  const [activeTab, setActiveTab] = useState('challenge');
  const [phase, setPhase] = useState("judging"); // judging / submission

  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white mt-[70px] rounded-lg shadow-md p-6 relative">
        {/* Settings Button */}
        <button className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        <h1 className="text-2xl font-bold text-gray-800">John's Group</h1>
        <p className="text-sm text-gray-600">5 Members | Minneapolis, MN</p>

        <div className="mt-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'challenge'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('challenge')}
            >
              Challenge
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'standings'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('standings')}
            >
              Leaderboard
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'challenge' && phase == "submission" && (
              <div>
                <p className="text-gray-600">
                  Your prompt is...
                </p>
                <p className="text-lg font-bold text-gray-800">
                  Take a photo of the coolest stick you can find in Minneapolis
                </p>

                <div className="mt-6">
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Submit Your Photo
                    </button>
                </div>
              </div>
            )}
            {activeTab === 'challenge' && phase == "judging" && (
              <div>
                <p className="text-gray-600">
                  Submission is over! Time to judge the prompt:
                </p>
                <p className="text-lg font-bold text-gray-800">
                  Take a photo of the coolest stick you can find in Minneapolis
                </p>

                <div className="mt-6">
                    <button onClick={() => {navigate("/judge")}} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Judge Photos
                    </button>
                </div>
              </div>
            )}
          </div>
            {activeTab === 'standings' && (
              <div>
                <p className="text-gray-600">
                  Most recent winner: {"Alex"}
                </p>
                <p>
                  1. Tony - 500 points
                </p>
                <p>
                  2. Aarush - 500 points
                </p>
                <p>
                  3. Alex - 500 points
                </p>

                <div className="mt-6">
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        View all challenges
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default ChallengePage;