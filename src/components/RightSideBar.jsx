import React from 'react';
import { AiOutlineSearch } from "react-icons/ai"; // Changed icon import
import Avatar from 'react-avatar';
import './RightSideBar.css';
import { Link } from 'react-router-dom';
import { MdVerified } from "react-icons/md";
const RightSideBar = ({ otherUsers }) => {
    return (
        <div className="right-sidebar">
            <div className="search-container">
                <div className="search-input">
                    <AiOutlineSearch size={ 30 } />
                    <input type='text' placeholder='Search By UserName....' className="search-input-text" />
                </div>
            </div>

            <div className="who-to-follow">
                <h3>Who to follow</h3>
                <div className="follow-list">
                    { otherUsers?.map((user) => (
                        <div key={ user?._id } className="follow-item">
                            <div>
                                <Avatar name={ user?.name } size={ 30 } round={ true } />
                            </div>

                            <div className="user-details">
                                <h5>{ user?.name }<MdVerified /> </h5>
                                <p>@{ user?.username }</p>
                            </div>
                            <Link to={ `/profile/${user?._id}` } className='profile'><button>Profile</button>
                            </Link>

                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}

export default RightSideBar;
