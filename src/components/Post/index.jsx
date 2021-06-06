import {React, useState, useEffect} from 'react';
import { getUserAPI } from '../../api';
import Preloader from '../Preloader';
import './post.scss';

export default function Post({mediaInfo}) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        getUserAPI(mediaInfo.id).then(({data}) => setUser(data));
    }, [mediaInfo])
    return (
        <>
            {Object.keys(user).length ?
            <div className="post">
                {mediaInfo.mediaLink.split('.').pop() === 'jpg' ?
                    <div className="post__item">
                        <img src={mediaInfo.mediaLink} alt="photos"/>
                        <h1>{mediaInfo.mediaName}</h1>
                        <h2>{mediaInfo.description}</h2>
                    </div>:
                    <div className="post__item">
                        <video>
                            <source src={mediaInfo.mediaLink} />
                        </video>
                        <h1>{mediaInfo.mediaName}</h1>
                        <h2>{mediaInfo.description}</h2>
                    </div>
                }
                <div className="post__channel">
                    <img src={user.avatar} alt="avatar" />
                    <div className="post__channel-info">
                        <a href={"/id" + mediaInfo.uid}>{mediaInfo.channelName}</a>
                        <h5>Подписчиков: {user.subscribers.length}</h5>
                    </div>
                </div>
            </div>: <Preloader />}
        </>
    )
}
