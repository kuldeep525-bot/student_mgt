import axios from "axios";
import React, { useState } from "react";
import { Link, Links, useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/api/auth/logout",
        {},
        { withCredentials: true },
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div data-theme="forest">
      <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
        {/* Logo */}
        <div className="flex-1">
          <Link
            to={"/"}
            className="btn btn-ghost text-xl font-bold tracking-wide"
          >
            StudentMgt
          </Link>
        </div>

        {/* Center Menu */}
        <div className="navbar-center lg:items-center lg:justify-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>PYQ's</a>
            </li>

            {/* FEATURES DROPDOWN (UNCHANGED) */}
            <li>
              <details>
                <summary>other products</summary>
                <ul className="p-2 bg-base-100 w-40 z-10">
                  <li>
                    <a>Url Shortner</a>
                  </li>
                  <li>
                    <a aria-disabled="true" className="">
                      Upcomming...
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-3">
          {/* If NOT logged in */}
          {!isLoggedIn && (
            <>
              <Link to={"/login"} className="btn btn-ghost">
                Login
              </Link>

              <button className="btn btn-primary">Sign Up</button>
            </>
          )}

          {/* If Logged in */}
          {isLoggedIn && (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow"
                >
                  <li>
                    <a>My Dashboard</a>
                  </li>
                  <li>
                    <a>Saved Notes</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Dark Mode</a>
                  </li>
                  <li>
                    <a onClick={() => handleLogout()}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
