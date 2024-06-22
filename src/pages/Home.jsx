import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import Feed from "../components/Feed";
import useOtherUsers from "../hooks/useOtherUser";
import store from "../redux/store";
import useMyTweets from "../hooks/useMyTweets";
import "./Home.css"; // Import the CSS file

const Home = () => {
    const navigate = useNavigate()
    const { user } = useSelector((store) => store.user);
    useEffect(() => {
        if (user == null) {
            navigate('/login')
        }

    }, [])

    useOtherUsers(user?._id)
    const { otherUsers } = useSelector((store) => store.user)

    useMyTweets(user?._id)



    return (
        <>
            <div className='lessscreen-error'>
                <div className='error-message'>
                    For the best viewing experience, switch to desktop view or use a desktop device.
                </div>
            </div>

            <div className="container">
                <LeftSideBar />
                <Outlet />
                <RightSideBar otherUsers={ otherUsers } />
            </div>
        </>

    );
};

export default Home;
