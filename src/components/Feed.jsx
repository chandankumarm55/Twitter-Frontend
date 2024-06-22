import React from 'react';
import './Feed.css'; // Import CSS for feed
import CreatePost from './CreatePost';
import Tweet from './Tweet';
import {useSelector} from 'react-redux'
import store from '../redux/store';

const Feed = () => {
    const {tweets} = useSelector((store)=>store.tweet)
    return (
        <div className="feed-container">
            <CreatePost />
              {
                tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet={tweet} />)
              }

            
            
        </div>
    );
}

export default Feed;
