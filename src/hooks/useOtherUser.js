import axios from "axios";
import { useEffect } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useOtherUsers = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async() => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otherusers/${id}`, {
                    withCredentials: true
                });

                dispatch(getOtherUsers(res.data.otherUsers));
            } catch (error) {
                console.log(error);
            }
        };
        fetchOtherUsers();
    }, [dispatch, id]);

    return null;
};

export default useOtherUsers;