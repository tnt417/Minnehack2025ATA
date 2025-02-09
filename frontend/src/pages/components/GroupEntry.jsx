import React from 'react';

const GroupEntry = ({ groupName, numPeople, joined }) => {
  return (
    <div className="flex items-center justify-between m-auto p-4 bg-white rounded-lg shadow-md mb-4 max-w-[1000px]">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{groupName}</span>
        <span className="text-sm text-gray-600">{numPeople} members</span>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        {joined ? "View" : "Join"}
      </button>
    </div>
  );
};

export default GroupEntry;
