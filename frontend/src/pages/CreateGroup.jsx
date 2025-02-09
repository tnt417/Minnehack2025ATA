import React, { useState } from "react";

export default function CreateGroup() {
  const [formData, setFormData] = useState({
    groupName: "",
    timeLength: "",
    groupType: "public", // Default to public
    password: "", // Only required if private
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form Data Submitted:", formData);
    // Add your submission logic here
  };

  const validateData = () => {
    // Basic validation: Ensure groupName and timeLength are filled
    return (
      formData.groupName.trim() !== "" &&
      formData.timeLength.trim() !== "" &&
      (formData.groupType === "public" || formData.password.trim() !== "")
    );
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

          {/* Time Length (Days) */}
          <div className="mb-4">
            <label htmlFor="timeLength" className="block mb-1 text-maroon">
              Time Length (Days)
            </label>
            <input
              type="number"
              id="timeLength"
              name="timeLength"
              value={formData.timeLength}
              onChange={handleChange}
              className="border border-maroon_dark rounded px-3 py-2 w-full"
              placeholder="Enter time length in days"
              min="1"
              required
            />
          </div>

          {/* Public/Private Dropdown */}
          <div className="mb-4">
            <label htmlFor="groupType" className="block mb-1 text-maroon">
              Public/Private
            </label>
            <select
              id="groupType"
              name="groupType"
              value={formData.groupType}
              onChange={handleChange}
              className="border border-maroon_dark rounded px-3 py-2 w-full"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Password (Conditional Rendering for Private Groups) */}
          {formData.groupType === "private" && (
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 text-maroon">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-maroon_dark rounded px-3 py-2 w-full"
                placeholder="Enter password for private group"
                required={formData.groupType === "private"}
              />
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="text-white mt-4 px-4 w-full py-2 rounded bg-blue-500"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}