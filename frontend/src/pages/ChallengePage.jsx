import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backend from "../backend.js";

const ChallengePage = ({auth}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('groupId');

  const [activeTab, setActiveTab] = useState('challenge');
  const [phase, setPhase] = useState("submission"); // judging / submission / intermission

  const navigate = useNavigate();

  const [currentSubmission, setSubmission] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    console.log(groupId)
  })

  const handleFileChange = (event) => {

    console.log("Starting file upload");

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("Now sending picture");
      backend.post(`/challenge-submission?auth=${auth}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
          "Accept": "multipart/form-data",
        }
      }).then((res) => {
        console.log(`Uploaded img: ${res}`);
      });
      setSubmission(selectedFile);

      // Create a URL for the selected image file and set it in state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image URL once the file is loaded
      };
      reader.readAsDataURL(selectedFile); // Read the file as a Data URL
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto transition-all duration-300 bg-white mt-[70px] rounded-lg shadow-md p-6 relative">
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
              className={`flex-1 py-2 px-4 text-center transition-all duration-100 ${
                activeTab === 'challenge'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('challenge')}
            >
              Challenge
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center transition-all duration-100 ${
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
                <p className="text-2xl font-bold text-gray-800">
                  Take a photo of the coolest stick you can find in Minneapolis
                </p>

                {imageUrl && (
                  <div className="mt-4">
                    <p>Your current submission</p>
                    <img
                      src={imageUrl}
                      alt="Selected preview"
                      className="min-w-full aspect-square object-contain shadow-lg rounded-md"
                    />
                  </div>
                )}

                <div className="mt-6">
                <form
                  id="submissionUploadForm"
                  className="flex flex-col items-center w-full"
                  action="/submit"
                  method="post"
                  encType="multipart/form-data"
                >
                  <label
                    htmlFor="fileInput"
                    className="px-4 py-2 w-full bg-blue-500 text-center text-white rounded-md cursor-pointer"
                  >
                    {!imageUrl ? "Submit a Photo" : "Replace Submission"}
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept='image/*'
                    className="hidden"
                  />
                  {/* Hidden submit button (automatically triggered) */}
                  <button type="submit" className="hidden">
                    Submit
                  </button>
                </form>
    </div>
              </div>
            )}
            {activeTab === 'challenge' && phase == "judging" && (
              <div>
                <p className="text-gray-600">
                  Submission is over! Time to judge the prompt.
                </p>

                <div className="mt-6">
                    <button onClick={() => {navigate("/judge")}} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Judge Photos
                    </button>
                </div>
              </div>
            )}
            {activeTab === 'challenge' && phase == "intermission" && (
              <div>
                <p className="text-gray-600">
                  The results are in... The winner of this challenge is Alex
                </p>

                <p className="text-gray-600">
                  The prompt was cool sticks
                </p>

                <p className="text-gray-600">
                  PHOTO GOES HERE
                </p>
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