import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react"
import backend from "../backend"

export default function JoinGroup({ authToken }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const groupId = queryParams.get('groupId');

const navigate = useNavigate();

  if (!groupId) {
    return <p>Invalid group invite link.</p>;
  }

  async function postJoinGroup()
  {
    if(!groupId) return;
    if(!authToken) return;

    var res = await backend.get(`/post-use-join-link?auth=${authToken}&groupId=${groupId}`)

    console.log("Joining group: ", res)

    if(res.status == 200 || res.status == 208)
    {
        navigate("/challenge?groupId=" + groupId)
    }
  }

  // Simulate sending a request to join the group
  useEffect(() => {
    postJoinGroup();
  }, [authToken, groupId]);

  return (<p>Joining group {groupId}...</p>);
}
