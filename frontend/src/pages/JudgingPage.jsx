import Submission from "./components/Submission"
import React, { useState } from "react"
import stickImg from "../assets/coolstick.jpg"

export default function JudgingPage()
{
    const [submissions, setSubmissions] = useState([
        {user:"Tony", photo:stickImg},
        {user:"Berry", photo:stickImg},
        {user:"Alex", photo:stickImg},
        {user:"Alex", photo:stickImg},
        {user:"Alex", photo:stickImg},
        {user:"Alex", photo:stickImg}
        ]);

    const [prompt, setPrompt] = useState(["a cool stick"]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const setPhoto = (photo, value) => {
        if(value)
        {
            setSelectedPhotos(selectedPhotos.concat(photo))
        }else{
            setSelectedPhotos(selectedPhotos.filter(item => item !== photo))
        }
    }

    return (
        <div className="w-full h-full pt-[100px] flex flex-col">
  <div className="max-w-[350px] sm:max-w-[700px] max-h-[900px] px-[20px] bg-white mx-auto font-roboto_condensed text-black px-[5px] rounded-xl shadow-lg flex flex-col">
    <h1 className={"py-[10px] border-b-2 text-lg border-gray-200"}>Pick 3 of the following images that best show a photo of {prompt}</h1>
    
    {/* Scrollable image grid */}
    <div className="flex-1 overflow-y-scroll py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full justify-center mx-auto">
        {submissions.map((obj) => (
          <Submission key={obj.id} submissionData={obj} setPhoto={setPhoto} selectionFull={() => {return selectedPhotos.length >= 3}} />
        ))}
      </div>
    </div>

    {/* Floating bottom div */}
    <div className="flex justify-between items-center bg-white px-4 py-3 mt-auto rounded-xl mb-0">
      <span className="text-lg">
        {selectedPhotos.length}/3 photos selected
      </span>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        disabled={selectedPhotos.length !== 3}
      >
        Cast Vote
      </button>
    </div>
  </div>
</div>

    );
}