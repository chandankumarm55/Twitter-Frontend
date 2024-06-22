import React from 'react';
import Logo from "../images/logo.jpg";
import { CiHome } from 'react-icons/ci';
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { FaBookmark, FaHashtag } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import "./LeftSideBar.css";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getUser, getOtherUsers, getMyProfile, followingUpdate } from '../redux/userSlice';


const LeftSideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((store) => store.user);

    const logout = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null))
            dispatch(getMyProfile(null))
            navigate('/login')
            toast.success(res.data.message)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='left-sidebar'>
            <div className='logo-container'>
                <img src={ Logo } alt='Twitter Logo' style={ { width: '30px', marginLeft: '15px' } } />
            </div>
            <div className='menu-container'>
                <div className="menu-item" onClick={ () => navigate('/') }>
                    <div><IoIosHome size={ 24 } /></div>
                    <h3>Home</h3>
                </div>
                <div className="menu-item" onClick={ () => navigate('/explore') }>
                    <div><FaHashtag size={ 24 } /></div>
                    <h3>Explore</h3>
                </div>
                <div className="menu-item" onClick={ () => navigate('/notifications') }>
                    <div><IoIosNotifications size={ 24 } /></div>
                    <h3>Notifications</h3>
                </div>
                <Link to={ `/profile/${user?._id}` } className='LINK'>
                    <div className="menu-item">
                        <div><CgProfile size={ 24 } /></div>
                        <h3>Profile</h3>
                    </div>
                </Link>
                <div className="menu-item" onClick={ () => navigate('/bookmark') }>
                    <div><FaBookmark size={ 24 } /></div>
                    <h3>Bookmark</h3>
                </div>
                <div className="menu-item" onClick={ logout }>
                    <div><AiOutlineLogout size={ 24 } /></div>
                    <h3>Logout</h3>
                </div>
                <button className="post-button" onClick={ () => navigate('/post') }>Post</button>
            </div>
        </div>
    );
}

export default LeftSideBar;
