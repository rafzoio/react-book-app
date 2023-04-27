import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const format = useSelector((state) => state.format.currentFormat);
  const [currentFormat, setCurrentFormat] = useState(format);

  const changeFormat = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_FORMAT", payload: format });
    toast.success("Settings updated");
  };

  return (
    <div className="flex flex-col align-middle mx-auto w-full items-center">
      <h1 className="text-4xl font-extrabold my-2 p-2 text-white">Settings</h1>
      <form className="p-2" onSubmit={changeFormat}>
        <section className="gap-4 flex flex-row gap-3 items-center">
          <label className="text-white" htmlFor="format-dropdown">
            Format:
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="format-dropdown"
            value={currentFormat}
            onChange={(event) => setCurrentFormat(event.target.value)}
          >
            <option>application/json</option>
            <option>application/xml</option>
          </select>

          <button className=" w-60 text-black focus:ring-4 focus:outline-none font-bold rounded-lg text-medium py-2.5 text-center bg-gray-200 hover:bg-gray-400">
            Save settings
          </button>
        </section>
      </form>
    </div>
  );
};

export default Settings;
