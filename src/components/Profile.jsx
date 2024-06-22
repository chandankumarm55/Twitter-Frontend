

import React, { useState, useEffect } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useSelector, useDispatch } from 'react-redux';
import { followingUpdate, getMyProfile } from '../redux/userSlice';
import useGetProfile from "../hooks/useGetProfile";
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const { profile } = useSelector(state => state.user);
  const { id } = useParams();
  useGetProfile(id)

  const dispatch = useDispatch();

  const followAndUnfollow = async () => {

    if (user.following.includes(id)) {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id} `, { id: user?._id }, { withCredentials: true })
        console.log('axios')
        console.log(res)
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        console.log(error.response.data.message)
      }
    } else {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id} `, { id: user?._id }, { withCredentials: true })
        console.log(res)
        console.log('axios')
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  }

  // Array of random descriptions
  const randomDescriptions = [
    "🌙 | Coffee lover ☕ | Music enthusiast 🎵 | Wanderlust ✈️ | Dreamer 💭 | Psychology student 🧠 | Bookworm 📚 | Adventure seeker 🌍 | Nature admirer 🌺 | Yoga practitioner 🧘‍♀️",
    "🌌 | Artist 🎨 | Animal lover 🐾 | Daydreamer ☁️ | Tea addict 🍵 | Vintage fashion enthusiast 👗 | Cat mom 🐱 | Amateur astronomer 🔭 | Stargazer ✨ | Hopeless romantic 💖",
    "☀️ | Optimist 😊 | Foodie 🍽️ | Beach bum 🏖️ | Fitness enthusiast 💪 | Dog lover 🐶 | DIY enthusiast 🛠️ | Plant mom 🌿 | Sunset chaser 🌅 | Travel addict 🌏",
    // Add more descriptions here...
  ];

  // State to hold the random description
  const [randomDescription, setRandomDescription] = useState("");

  // Function to select a random description on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomDescriptions.length);
    setRandomDescription(randomDescriptions[randomIndex]);
  }, []);

  return (
    <div className="profile-container">
      <div>
        <div className="profile-header">
          <Link to='/' className='LINK'>
            <div className="back-button">
              <IoMdArrowBack size={ 30 } />
            </div>
          </Link>
          <div className="profile-info">
            <h5>{ profile?.name }</h5>
            <p>0 posts</p>
          </div>
        </div>
        <img
          src='https://img.freepik.com/free-photo/silhouette-man-photographer-with-camera-hand-background-mountains-sunset-with-fog-amazing-shot-beauty-world-human_627829-12464.jpg'
          alt="banner"
          className="profile-banner"
        />
        <div className="profile-avatar-container">
          <div className="avatar-wrapper">
            <Avatar
              src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
              size={ 120 }
              round={ true }
              className='profile-avatar'
            />
          </div>
          <div>
            {
              profile?._id === user?._id ? (<button className='edit-profile-button'>Edit Profile</button>) :
                (
                  <button className='edit-profile-button' onClick={ followAndUnfollow }>{ user.following.includes(id) ? 'Following' : 'Follow' }</button>)
            }
          </div>
        </div>
        <div className='profile-information'>
          <div className="profile-details">
            <h3>{ profile?.name }</h3>

          </div>
          <div className='about'>

            <span>@{ `${profile?.username} ` }</span>
            { randomDescription }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
