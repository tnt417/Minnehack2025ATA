import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backend from "../backend.js";
import placeholder from "../assets/placeholder.png"
import WeekManager from "../time.js"

const ChallengePage = ({auth}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('groupId');

  const [activeTab, setActiveTab] = useState('challenge');
  const [phase, setPhase] = useState("judging"); // judging / submission / intermission

  const [prompt, setPrompt] = useState("No prompt has been set");

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(placeholder);

  const [groupData, setGroupData] = useState({
    name: "Group",
    memberIds: [1]
  });

  async function fetchGroup () {
    var res = await backend.get(`/group-data?groupId=${groupId}`)
    
    console.log(res)
    setGroupData(res.data[0])

    var challenges = res.data[0].challenges;
    var curChallenge = challenges[challenges.length-1];

    let timeManager = new WeekManager(curChallenge.start_date, curChallenge.end_date)

    console.log(timeManager.getWeekProgress())
    setPhase(timeManager.getWeekProgress())

    setPrompt(curChallenge.prompt)

    var ldb = await backend.get(`/leaderboard?groupId=${groupId}`)

    console.log(ldb)
    setLeaderboard(ldb.data)
  }

  async function fetchSubmission () {
    var res = await backend.get(`/current-submission?auth=${auth}&groupId=${groupId}`,{
      headers:{"Content-Type": "multipart/form-data", Accept: "multipart/form-data"}
    })

    console.log(res.data.image_name)

    if(res.data.image_name == null) return;

    //TODO: change when deploying
    setImageUrl("http://localhost:3000/" + res.data.image_name)
  }

  const [leaderboard, setLeaderboard] = useState([
    {name: "Tony", score: 5},
    {name: "Berry", score: 4},
    {name: "Alex", score: 3},
    {name: "BadPlayer", score: 2},
    {name: "TerriblePlayer", score: 1}])

  useEffect(() => {
    fetchGroup()
    fetchSubmission()
  }, [])

  const handleFileChange = (event) => {

    console.log("Starting file upload");

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("Now sending picture");
      backend.post(`/challenge-submission?auth=${auth}&groupId=${groupId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
          "Accept": "multipart/form-data",
        }
      }).then((res) => {
        console.log(`Uploaded img: ${res}`);
      });

      // Create a URL for the selected image file and set it in state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image URL once the file is loaded
      };
      reader.readAsDataURL(selectedFile); // Read the file as a Data URL
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen z-[-5]">
      <div className="max-w-2xl mx-auto transition-all duration-300 bg-white mt-[70px] rounded-lg shadow-md p-6 relative">
        {/* Settings Button */}
        <button onClick={() => {navigate(`/group-info?groupId=${groupId}`)}}className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700">
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

        <h1 className="text-2xl font-bold text-gray-800">{groupData.name}</h1>
        <p className="text-sm text-gray-600">{groupData.memberIds.length} Members | Minneapolis, MN</p>

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
                  This week's prompt is...
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {prompt}
                </p>

                {imageUrl && (
                  <div className="mt-4">
                    {/* <p>{imageUrl == placeholder ? "Please submit a photo" : "Your current submission"}</p> */}
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
                    {(!imageUrl || imageUrl == placeholder) ? "Submit a Photo" : "Replace Submission"}
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
                    <button onClick={() => {navigate(`/judge?groupId=${groupId}`)}} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
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

                {
                  leaderboard.map((val, idx) => {
                    const maxScore = Math.max(...leaderboard.map(entry => entry.score)); // Get max score
                    const progressWidth = (val.score / maxScore) * 100; // Calculate width percentage
                    const color = (idx == 0 ? "#F4CE50" : (idx == 1 ? "#C9D5DC" : (idx == 2 ? "#DAA958" : "#E5E7EB")))
                    const emoji = (idx == 0 ? "🥇" : (idx == 1 ? "🥈" : (idx == 2 ? "🥉" : "")))
                    
                    return (
                      <div key={idx} className="relative w-full m-[2px] p-[2px]">
                        {/* Background progress bar */}
                        <div className="absolute left-0 top-0 h-full bg-gray-100 rounded-md" style={{ width: "100%" }}></div>
                        <div 
                          className={`absolute left-0 top-0 h-full rounded-md`}
                          style={{ width: `${progressWidth}%`, background: `${color}` }} // Dynamic width
                        ></div>

                        {/* Text content */}
                        <div className="relative flex justify-between w-full px-[5px] py-[2px] text-black">
                          <span>{emoji == "" ? idx + 1 + "." : emoji } {val.name.name}</span>
                          <span>{val.score} points</span>
                        </div>
                      </div>
                    );
                  })
                }

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