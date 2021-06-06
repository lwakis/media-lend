import React from 'react';
import { getUserAPI, subscribeAPI, unSubscribeAPI } from '../../api';
import Preloader from '../Preloader';
import './channel.scss';

export default function Channel({profile, id}) {
    const link = +window.location.pathname.replace(/\/id/, '');
    const [subscrib, setSubscrib] = React.useState([]);
    React.useEffect(() => {
        getUserAPI(id).then(({data}) => setSubscrib(data.subscribe));
    }, [id])
    const subscribe = (id, userId) => {
        subscribeAPI(id, userId);
    }

    const unSubscribe = (id, userId) => {
        unSubscribeAPI(id, userId);
    }

    const toMedia = (p) => {
        window.location.href = `id${p.uid}_${p.id}`;
    }
    return (
        <>
        { !profile ? <Preloader /> : 
            <div className="channel">
                <div className="channel__info">
                    <img src={profile.avatar} alt="avatar"/>
                    <h1>{profile.channelName}</h1>
                    {link !== id &&
                        <>{!!subscrib.find(i => i === link) 
                        ? <button onClick={() => unSubscribe(id, link)}>Отписаться</button>
                        : <button onClick={() => subscribe(id, link)}>Подписаться</button>}
                        </>
                    }
                    <span>Подписчиков: {profile.subscribers.length}</span>
                </div>

                {profile.media.length !== 0 ? <div className="channel__media">
                    {profile.media.map((p, index) => {
                        return (
                            <div key={index} onClick={() => toMedia(p)} className="channel__media-items">
                                {p.mediaLink.split('.').pop() === 'jpg' ?
                                    <div>
                                        <img src={p.mediaLink} alt="photos"/>
                                        <b>{p.mediaName}</b>
                                    </div>:
                                    <div>
                                        <video>
                                            <source src={p.mediaLink} />
                                        </video>
                                        <b>{p.mediaName}</b>
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div> 
                :   <div className="no-content">
                        {profile.id !== id ? <h2>у автора нет контента</h2> : <h2>у вас нет контента</h2>}
                    </div>}
            </div>}
        </>
    )
}