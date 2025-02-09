import React, { useState } from "react";

import backend from "../backend"
import { useNavigate } from "react-router-dom";

export default function CreateGroup({authToken}) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groupName: "",
    initialPrompt: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function submitGroup
  () {
    var res = await backend.get(`/post-new-group?auth=${authToken}&groupName=${formData.groupName}&initialPrompt=${formData.initialPrompt}`);

    if(res.status == 200){
      navigate("/my-groups")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data Submitted:", formData);

    submitGroup();

    // Add submission logic here
  };

  return (
    <div className="w-full min-h-screen pt-[100px]">
      <div className="max-w-lg mx-auto font-roboto_condensed text-black px-[10px] rounded-xl shadow-lg">
        <h2 className="text-xl font-extrabold font-roboto_slab text-maroon_dark mb-4 pt-[10px]">
          Create a Group
        </h2>
        <form onSubmit={handleSubmit} className="pb-8">
          {/* Group Name */}
          <div className="mb-4">
            <label htmlFor="groupName" className="block mb-1 text-maroon">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              className="border border-maroon_dark rounded px-3 py-2 w-full"
              placeholder="Enter group name"
              required
            />
          </div>

          {/* Initial Prompt */}
          <div className="mb-4">
            <label htmlFor="initialPrompt" className="block mb-1 text-maroon">
              Initial Prompt
            </label>
            <textarea
              id="initialPrompt"
              name="initialPrompt"
              value={formData.initialPrompt}
              onChange={handleChange}
              className="border border-maroon_dark rounded px-3 py-2 w-full"
              placeholder="Enter initial prompt"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="text-white mt-4 px-4 w-full py-2 cursor-pointer hover:bg-blue-600 rounded bg-blue-500"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
