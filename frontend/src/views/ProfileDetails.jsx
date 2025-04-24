import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export default function ProfileDetails() {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [error, setError] = useState({});
  const [profileData, setProfileData] = useState();

  const [pwd, setPwd] = useState({ oldpwd: "", newpwd: "", confirmpwd: "" });

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-user-information",
        { headers }
      );
      setProfileData(response.data);
    };
    fetch();
  }, []);

  const handleInputPwd = (e) => {
    setPwd({ ...pwd, [e.target.name]: e.target.value });
  };
  const handleSubmitPwd = async (e) => {
    e.preventDefault();
    if (pwd.newpwd === pwd.confirmpwd) {
      await axios
        .put(`${BASE_URL}/update-pwd`, pwd, { headers })
        .then((result) => {
          alert(result.data.message);
          setPwd({ oldpwd: "", newpwd: "", confirmpwd: "" });
        })
        .catch((error) => alert(error.response.data.message));
    } else {
      alert("new Password and Confirm Password not match");
    }
  };

  const handleInput = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData);
    const newError = validateForm(profileData);
    setError(newError);

    if (Object.keys(newError).length === 0) {
      await axios
        .put(`${BASE_URL}/update-profile`, profileData, {
          headers,
        })
        .then((result) => {
          alert(result.data.message);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username.trim()) {
      errors.username = "Username is required";
    }

    if (String(data.number).trim() === 0) {
      errors.number = "Number is required";
    } else if (String(data.number).length === "10") {
      errors.number = "Number must be at least 10 characters long";
    }

    if (!data.address.trim()) {
      errors.address = "Address is required";
    }

    return errors;
  };

  return (
    <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loading />
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-2xl md:text-3xl text-center ">Profile Details</h1>
          <div className="flex flex-col md:flex-row justify-center p-5">
            <div className="w-full p-3">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <label className="font-bold">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="p-2 w-full rounded bg-zinc-800 mt-2 font-semibold"
                    value={profileData.username}
                    onChange={handleInput}
                  />
                  {error.username && (
                    <span className="text-red-600">{error.username}</span>
                  )}
                </div>
                <div className="">
                  <label className="font-bold">Email </label>
                  <input
                    name="email"
                    className="p-2 w-full rounded bg-zinc-800 mt-2 font-semibold"
                    value={profileData.email}
                    onChange={handleInput}
                    disabled
                  />
                </div>
                <div className="">
                  <label className="font-bold">Number</label>
                  <input
                    type="text"
                    name="number"
                    className="p-2 w-full rounded bg-zinc-800 mt-2 font-semibold"
                    value={profileData.number}
                    onChange={handleInput}
                  />
                  {error.number && (
                    <span className="text-red-600">{error.number}</span>
                  )}
                </div>

                <div className="mt-4 flex flex-col">
                  <label className="font-bold">Address</label>
                  <textarea
                    className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
                    rows="3"
                    placeholder="Address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInput}
                  />
                  {error.address && (
                    <span className="text-red-600">{error.address}</span>
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="bg-yellow-500  text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-300 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>

            <div className="p-3 justify-center items-center w-full ">
              <h1 className="text-center text-3xl font-mono">
                Change Password
              </h1>
              <form className="flex flex-col p-5" onSubmit={handleSubmitPwd}>
                <input
                  type="password"
                  name="oldpwd"
                  placeholder="OldPassword"
                  className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
                  value={pwd.oldpwd}
                  onChange={handleInputPwd}
                />
                <input
                  type="password"
                  name="newpwd"
                  placeholder="New Password"
                  className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
                  value={pwd.newpwd}
                  onChange={handleInputPwd}
                />
                <input
                  type="password"
                  name="confirmpwd"
                  placeholder="Confirm Password"
                  className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
                  value={pwd.confirmpwd}
                  onChange={handleInputPwd}
                />
                <div className="mt-4 flex justify-center">
                  <button
                    className="cursor-pointer rounded mt-3 bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
