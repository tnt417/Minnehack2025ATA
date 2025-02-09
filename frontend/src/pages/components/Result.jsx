import React, { useState } from "react";

export default function Result({imageName})
{

    return (
        <div className="w-[300px] h-[300px] bg-black rounded-xl relative">
            <img
                className={`shadow-sm relative left-0 top-0 w-full aspect-square rounded-xl transition duration-200`}
                src={"http://localhost:3000/" + imageName}
                alt="Submission"
            />
            </div>

    );
}