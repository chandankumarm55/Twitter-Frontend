import axios from "axios";
import { useEffect } from "react";
import { Tweet_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import { useSelector } from "react-redux"

const useMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector((store) => store.tweet)

    const fowllowingTweetHandler = async() => {
        try {

            const res = await axios.get(`${Tweet_API_END_POINT}/followingtweets/${id}`, { withCredentials: true });
            console.log("follwing", res)
            dispatch(getAllTweets(res.data.tweets));

        } catch (error) {

        }
    }
    const fetchMyTweets = async() => {
        try {
            const res = await axios.get(`${Tweet_API_END_POINT}/alltweets/${id}`, {
                withCredentials: true
            });
            console.log('Tweets', res)
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        } else {
            fowllowingTweetHandler();
        }



    }, [isActive, refresh]);

    return null;
};

export default useMyTweets;