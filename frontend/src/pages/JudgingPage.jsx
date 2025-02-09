import Submission from "./components/Submission"
import React, { useState } from "react"

export default function JudgingPage()
{
    const [submissions, setSubmissions] = useState([
        {user:"Tony"},
        {user:"Berry"},
        {user:"Alex"}
        ]);

    const [prompt, setPrompt] = useState(["a cool stick"]);

    return (
        <div className={"w-full h-full flex flex-col justify-center items-center pt-[70px] overflow-y-scroll space-y-[50px]"}>
            <h1 className=""> Pick 3 of the followings images that best show a photo of {prompt}</h1>
            {submissions.map((obj) => {
                return <Submission submissionData={obj}></Submission>
            })}
        </div>
    );
}