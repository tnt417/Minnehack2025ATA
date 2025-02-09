import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backend from "../backend"

export default function GroupInfo()
{
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const groupId = queryParams.get('groupId');

    const [groupData, setGroupData] = useState({
      name: "Group",
      memberIds: [1]
    });
  
    async function fetchGroup () {
      var res = await backend.get(`/group-data?groupId=${groupId}`)

      console.log(res)

      setGroupData(res.data[0])
    }

    useEffect(() => {
      fetchGroup()
    }, [])

    return (    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/challenge?groupId=" + groupId)}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-2">{groupData.name}</h2>

        <h3 className="text-lg text-gray-600 mb-2">Invite Link</h3>
        <a
          href={`http://localhost:5173/join?groupId=${groupId}`}
          className="text-blue-600 font-medium break-all hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          http://localhost:5173/join?groupId={groupId}
        </a>
      </div>
    </div>);
}