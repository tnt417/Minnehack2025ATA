import React from 'react';
import GroupEntry from './components/GroupEntry';

const GroupList = () => {
  const groups = [
    { groupName: 'Steve\'s Group', numPeople: 5 },
    { groupName: 'CSE Majors', numPeople: 3 },
    { groupName: 'Minneapolis Maniacs', numPeople: 7 },
  ];

  return (
    <div className="space-y-4 w-full m-auto justify-center pt-[50px] bg-gray-100 min-h-screen">
    <h1 className="text-center text-2xl">Explore groups near you</h1>
    {groups.map((group, index) => (
        <GroupEntry key={index} groupName={group.groupName} numPeople={group.numPeople} />
    ))}
    </div>
  );
};

export default GroupList;
