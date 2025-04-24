import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../components/Loading";
import { MobileProfile } from "../components/MobileProfile";
import { BASE_URL } from "../utils/config";

export default function Profile() {
  //const isLoggedIn = useSelector();
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
    <div className="bg-zinc-900  px-2 md:px-12 flex flex-col  md:flex-row py-8 gap-4 text-white h-full">
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
}
