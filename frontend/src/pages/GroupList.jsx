import React, {useEffect, useState} from 'react';
import GroupEntry from './components/GroupEntry';
import backend from '../backend'

const GroupList = ({myGroups, authToken}) => {
  const [groups, setGroups] = useState([
    // id: memberCount: name:
  ]);

  async function fetchGroups () {
    console.log("Auth token: ", authToken)
    if(myGroups){
      var res = await backend.get(`/my-groups?auth=${authToken}`)
      setGroups(res.data)
      console.log("My groups: ", res)
    }
    else
    {
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
    {groups.map((group, index) => (
        <GroupEntry key={index} id={group.id} groupName={group.name} joined={myGroups} numPeople={group.memberCount} />
    ))}
    </div>
  );
};

export default GroupList;
