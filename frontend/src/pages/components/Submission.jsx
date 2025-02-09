import React, { useState } from "react";

export default function Submission({submissionData})
{
    return (
        <div className={"w-[300px] h-[300px] outline-1 rounded-xl"}>
            <p className="p-[20px]">{submissionData.user}'s Submission</p>
        </div>
    );
}