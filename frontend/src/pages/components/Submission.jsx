import React, { useState } from "react";

export default function Submission({imageName, submissionId, setId, selectionFull})
{

    const [selected, setSelected] = useState(false);

    const canClick = () => {
        return (!selectionFull()) || selected
    }

    return (
        <div className="w-[300px] h-[300px] bg-black rounded-xl relative">
            <img
                className={`shadow-sm relative left-0 top-0 w-full aspect-square rounded-xl ${canClick() ? "hover:opacity-80 cursor-pointer" : "disabled"} transition duration-200`}
                src={"http://128.101.131.201:3456/" + imageName}
                alt="Submission"
                onClick={() => {
                    if(!canClick()) return;
                    setId(submissionId, !selected);
                    setSelected(!selected);
                }}
            />
            <svg
                className={`absolute transition duration-200 ${selected ? "opacity-80" : "opacity-0"} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-white`}
                fill="#FFFFFF"
                width="200px"
                height="200px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>checkmark</title>
                <path d="M16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM23.258 12.307l-9.486 9.485c-0.238 0.237-0.623 0.237-0.861 0l-0.191-0.191-0.001 0.001-5.219-5.256c-0.238-0.238-0.238-0.624 0-0.862l1.294-1.293c0.238-0.238 0.624-0.238 0.862 0l3.689 3.716 7.756-7.756c0.238-0.238 0.624-0.238 0.862 0l1.294 1.294c0.239 0.237 0.239 0.623 0.001 0.862z"></path>
            </svg>
            </div>

    );
}