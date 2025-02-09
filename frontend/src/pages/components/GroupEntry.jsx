import React from 'react';
import { useNavigate } from 'react-router-dom';

const GroupEntry = ({ id, groupName, numPeople, joined }) => {
  const navigate = useNavigate()

  const goto = () => {
    if(joined) { navigate(`/challenge?groupId=${id}`) }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex w-full justify-between mx-4 p-4 bg-white rounded-lg shadow-md mb-[8px] max-w-[500px]">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{groupName}</span>
          <span className="text-sm text-gray-600">{numPeople} members</span>
        </div>
        <button onClick={goto} className="px-8 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          {joined ? "View" : "Join"}
        </button>
      </div>
    </div>
  );
};

export default GroupEntry;
