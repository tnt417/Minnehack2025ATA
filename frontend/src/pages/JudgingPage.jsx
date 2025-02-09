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
        <div className="w-full h-full flex flex-col justify-center items-center pt-[70px] overflow-y-scroll space-y-[50px]">
    <h1 className="">Pick 3 of the following images that best show a photo of {prompt}</h1>
    <div className="w-full max-w-[350px] sm:max-w-[650px] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full justify-center mx-auto">
            {submissions.map((obj) => (
                <Submission key={obj.id} submissionData={obj} />
            ))}
        </div>
    </div>
</div>
    );
}