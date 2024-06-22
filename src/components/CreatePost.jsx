import React, { useState } from 'react';
import Avatar from "react-avatar";
import './CreatePost.css';
import axios from 'axios';
import { Tweet_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { getRefresh, getIsActive } from '../redux/tweetSlice';

const CreatePost = () => {
    const [description, setDescription] = useState("");
    const { user } = useSelector((store) => store.user);
    const { isActive } = useSelector((store) => store.tweet);
    const dispatch = useDispatch();

    const submitHandler = async () => {
        try {
            const res = await axios.post(`${Tweet_API_END_POINT}/create`, { description, id: user?._id }, {
                withCredentials: true,
            });
            dispatch(getRefresh());
            toast.success(res.data.message);
            setDescription('');
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const forYouHandler = () => {
        dispatch(getIsActive(true));
    }

    const followingHandler = () => {
        dispatch(getIsActive(false));
    }

    return (
        <div className='create-post-container'>
            <div>
                <div className='post-tabs'>
                    <div className={ `post-tab ${isActive ? 'belowunderline' : null} ` } onClick={ forYouHandler } >
                        <h4>For you</h4>
                    </div>
                    <div className={ `post-tab ${!isActive ? 'belowunderline' : null} ` } onClick={ followingHandler } >
                        <h4>Following</h4>
                    </div>
                </div>
                <div className='post-input'>
                    <div className='create-post-avatar'>
                        <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={ true } />
                    </div>
                    <input value={ description } onChange={ (e) => setDescription(e.target.value) } type="text" placeholder='What is happening?!' />
                </div>
                <div className='post-options'>
                    <div className='create-post-icons'></div>
                    <button onClick={ submitHandler }>Post</button>
                </div>
            </div>
        </div >
    );
}

export default CreatePost;
