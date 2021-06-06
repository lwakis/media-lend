import React from 'react';
import { getSubscribeAPI, unSubscribeAPI } from '../../api';
import Preloader from '../Preloader';
import './subscribe.scss';

export default function Subscribe({id}) {
    const [subscribe, setSubscribe] = React.useState(false);

    React.useEffect(() => {
       getSubscribeAPI(id).then((res) => setSubscribe(res)).then(() => 'ошибка');
    }, [id])

    const goProfile = (id) => {
        window.location.href = `id${id}`;
    }

    const unSubscribe = (id, userId) => {
        unSubscribeAPI(id, userId);
    }
    return (
        <>
            {!subscribe ? <Preloader /> : 
                subscribe.length ?
                <div className="subscribe">
                    {subscribe.map((s) => 
                        <div className="subscribe__item" key={s.id}>
                            <img onClick={() => goProfile(s.id)} src={s.avatar} alt="avatar"/>
                            <h1 onClick={() => goProfile(s.id)}>{s.channelName}</h1>
                            <button onClick={() => unSubscribe(id, s.id)}>Отписаться</button>
                        </div>
                    )} 
                </div> : 
                <div className="subscribe__none">
                    <i>Вы еще не на кого не подписаны</i>
                </div> 
            }
        </>
    )
}
