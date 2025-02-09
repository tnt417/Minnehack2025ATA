import React, { useEffect, useState } from 'react';
import GroupEntry from './components/GroupEntry';
import backend from '../backend'
import { useNavigate, NavLink } from 'react-router-dom';

const GroupList = ({ myGroups, authToken }) => {
  const [groups, setGroups] = useState([
    // id: memberCount: name:
  ]);

  const navigate = useNavigate();

  async function fetchGroups() {
    console.log("Auth token: ", authToken)
    if (myGroups) {
      var res = await backend.get(`/my-groups?auth=${authToken}`)
      setGroups(res.data)
      console.log("My groups: ", res)
    }
    else {
      var res = await backend.get(`/all-groups?auth=${authToken}`)
      setGroups(res.data)
      console.log("All groups: ", res)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [myGroups, authToken])

  return (
    <div className="space-y-4 w-full m-auto justify-center pt-[50px] bg-gray-100 min-h-screen">
      <h1 className="text-center text-2xl mt-[50px]">{myGroups ? "Your Groups" : "Explore groups in your community..."}</h1>
      {myGroups && <div className='flex w-full justify-center align-middle'><NavLink to="/create-group"
            className={`flex flex-1 items-center justify-between mx-4 py-2 rounded-lg transition duration-300 bg-blue-500 max-w-[500px] mb-[15px] hover:bg-blue-600 text-white cursor-pointer`}
          >
            <p className="w-full text-center">Create a Group</p>
      </NavLink></div>}
      {groups.map((group, index) => (
        <GroupEntry key={index} id={group.id} groupName={group.name} joined={myGroups} numPeople={group.memberCount} />
      ))}
    </div>
  );
};

export default GroupList;
