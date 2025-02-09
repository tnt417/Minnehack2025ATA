import Submission from "./components/Submission"
import React, { useEffect, useState } from "react"
import stickImg from "../assets/coolstick.jpg"
import { useLocation } from "react-router-dom"
import backend from "../backend"

export default function JudgingPage({userId})
{
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('groupId');

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

    async function fetchCurChallenge()
    {
      var res = await backend.get(`/current_challenge?groupId=${groupId}`)

      setSubmissions(res.data.submissions)
      setPrompt(res.data.prompt)
    }

    useEffect(() => {
fetchCurChallenge();
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
    <h1 className={"pt-[10px] text-lg border-gray-200"}>Pick 3 of the following images that best show a photo fitting...</h1>
    <h1 className={"pb-[10px] border-b-2 font-semibold text-xl border-gray-200"}>{prompt}</h1>
    {/* Scrollable image grid */}
    <div className="flex-1 overflow-y-scroll py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full justify-center mx-auto">
        {submissions.map((obj) => (
          <Submission key={obj.id} submissionId={obj.id} imageName={obj.image_name} setId={setId} selectionFull={() => {return selectedIds.length >= 3}} />
        ))}
      </div>
    </div>

    {/* Floating bottom div */}
    <div className="flex justify-between items-center bg-white px-4 py-3 mt-auto rounded-xl mb-0">
      <span className="text-lg">
        {selectedIds.length}/3 photos selected
      </span>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        disabled={selectedIds.length !== 3}
      >
        Cast Vote
      </button>
    </div>
  </div>
</div>

    );
}