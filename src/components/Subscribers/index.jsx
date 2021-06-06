import React from 'react';
import { getSubscribersAPI, getUserAPI, subscribeAPI, unSubscribeAPI } from '../../api';
import Preloader from '../Preloader';
import './subscribers.scss';

export default function Subscribers({id}) {
    const [subscribers, setSubscribers] = React.useState([]);
    const [user, setUser] = React.useState([]);


    React.useEffect(() => {
       getSubscribersAPI(id).then((res) => setSubscribers(res)).then(() => 'ошибка');
       getUserAPI(id).then(({data}) => setUser(data));
    }, [id])

    const subscribe = (id, userId) => {
        subscribeAPI(id, userId);
    }

    const unSubscribe = (id, userId) => {
        unSubscribeAPI(id, userId);
    }

    const goProfile = (id) => {
        window.location.href = `id${id}`;
    }

    return (
        <>
            {!Object.keys(user).length ? <Preloader /> :
                user.subscribers.length ? 
                <div className="subscribers">
                    {subscribers.map((s) => 
                        <div className="subscribers__item" key={s.id}>
                            <img onClick={() => goProfile(s.id)} src={s.avatar} alt="avatar"/>
                            <h1 onClick={() => goProfile(s.id)}>{s.channelName}</h1>
                            <>{user.subscribe.find(i => i === s.id) 
                                ? <button onClick={() => unSubscribe(id, s.id)}>Отписаться</button>
                                : <button onClick={() => subscribe(id, s.id)}>Подписаться</button>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                            </>
                        </div>
                    )} 
                </div>: 
                <div className="subscribers__none">
                    <i>У вас еще нет подписчиков</i>
                </div>
            }
        </>
    )
}
