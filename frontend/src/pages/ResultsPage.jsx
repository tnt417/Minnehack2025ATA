import Result from "./components/Result"
import React, { useEffect, useState } from "react"
import stickImg from "../assets/coolstick.jpg"
import { useLocation, useNavigate } from "react-router-dom"
import backend from "../backend"
import WeekManager from "../time"

export default function ResultsPage()
{
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('groupId');
  const challengeId = queryParams.get('challengeId');

  const navigate = useNavigate();

    // const [submissions, setSubmissions] = useState([
    //     {user:"Tony", photo:stickImg},
    //     {user:"Berry", photo:stickImg},
    //     {user:"Alex", photo:stickImg},
    //     {user:"Alex", photo:stickImg},
    //     {user:"Alex", photo:stickImg},
    //     {user:"Alex", photo:stickImg}
    //     ]);

    const [prompt, setPrompt] = useState(["a cool stick"]);
    const [selectedIds, setSelectedId] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    let weekManager = null;

    async function fetchChallenge()
    {
      var res = await backend.get(`/past-challenge-result?groupId=${groupId}&challengeId=${challengeId}`)

      setSubmissions(res.data.submissions)
      setPrompt(res.data.prompt)

      weekManager = new WeekManager(res.data.start_date, res.data.end_date);

      console.log(res.data)
      console.log(weekManager.startTime)
    }

    useEffect(() => {
        fetchChallenge();
    }, []) 

    const setId = (id, value) => {
        if(value)
        {
          setSelectedId(selectedIds.concat(id))
        }else{
          setSelectedId(selectedIds.filter(item => item !== id))
        }
    }

    return (
        <div className="w-full h-full pt-[100px] flex flex-col">
  <div className="max-w-[350px] sm:max-w-[700px] max-h-[900px] px-[20px] bg-white mx-auto font-roboto_condensed text-black px-[5px] rounded-xl shadow-lg flex flex-col">
  <h1 className={"pt-[10px] text-lg border-gray-200"}>Results for...</h1>
    <h1 className={"pb-[10px] border-b-2 font-semibold text-xl border-gray-200"}>{prompt}</h1>
    {/* Scrollable image grid */}
    <div className="flex-1 overflow-y-scroll py-4">
      <div className="grid grid-cols-1 gap-2 w-full justify-center mx-auto">
        {submissions.map((obj,idx) => (
            <>
            <p>{idx+1}. {obj.name.name}</p>
            <Result key={idx} imageName={obj.image_name} />
          </>
        ))}
      </div>
    </div>

    {/* Floating bottom div */}
    <div className="flex justify-between items-center bg-white px-4 py-3 ml-[67%] mt-auto rounded-xl mb-0">
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => {navigate("/challenge?groupId=" + groupId)}}
      >
        Okay
      </button>
    </div>
  </div>
</div>

    );
}