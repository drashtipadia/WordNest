import React, { useEffect, useState } from "react";
import { Sidebar, Loading, MobileProfile } from "../components";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export const Profile = () => {
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      axios
        .get(`${BASE_URL}/get-user-information`, { headers })
        .then((response) => {
          //console.log(response);
          setProfile(response.data);
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, []);
  return (
    <div className="dark:bg-zinc-900  px-2 md:px-12 flex flex-col  md:flex-row py-8 gap-4 dark:text-white h-full">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loading />{" "}
        </div>
      )}
      {profile && (
        <>
          <div className="w-full md:w-2/6 lg:w-1/6 h-auto">
            <Sidebar data={profile} />
            <MobileProfile />
          </div>
          <div className="w-full md:w-4/6 lg:w-5/6 h-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
