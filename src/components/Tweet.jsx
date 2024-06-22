import React from 'react';
import Avatar from 'react-avatar';
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdOutlineDeleteOutline } from 'react-icons/md'
import './Tweet.css';
import axios from 'axios';
import { Tweet_API_END_POINT } from '../utils/constant';
import store from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import { getRefresh } from '../redux/tweetSlice';
import { timeSince } from '../utils/constant';
import { MdVerified } from "react-icons/md";

const Tweet = ({ tweet }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)

    const deleteTweetHandler = async (id) => {
        try {
            const res = await axios.delete(`${Tweet_API_END_POINT}/delete/${id}`, { withCredentials: true })
            toast.success(res.data.message)
            dispatch(getRefresh())
        } catch (error) {
            console.log(error)
        }

    }
    const likeOrDislike = async (tweetid) => {
        try {
            const res = await axios.put(`${Tweet_API_END_POINT}/like/${tweetid}`, { id: user?._id }, { withCredentials: true });
            console.log(res);

            toast.success(res.data.message);
            dispatch(getRefresh());
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };



    return (
        <div className="tweet-container">
            <div className="tweet-content">
                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size={ 50 } round="50%" />
                <div className="tweet-text">
                    <h5>{ tweet?.userDetails[0].name }<MdVerified size={ 15 } /> </h5>
                    <p>{ `@${tweet?.userDetails[0].username} .${timeSince(tweet?.createdAt)}` }</p>
                </div>
            </div>
            <div>
                <p>{ tweet?.description }</p>
            </div>
            <div className="tweet-actions">
                <div >
                    <div className='comment'><FaRegComment size={ 24 } /></div>
                    <p>0</p>
                </div>
                <div >
                    <div className='like' onClick={ () => likeOrDislike(tweet?._id) } ><FaRegHeart size={ 24 } /></div>
                    <p>{ tweet?.like?.length }</p>
                </div>
                <div>
                    <div className='bookmark'><FaRegBookmark size={ 20 } /></div>
                    <p>0</p>
                </div>
                { user?._id === tweet?.userId && (
                    <div onClick={ () => deleteTweetHandler(tweet?._id) }>
                        <div><MdOutlineDeleteOutline size={ 24 } className='delete' /></div>
                    </div>
                ) }



            </div>
        </div>
    );
}

export default Tweet;
