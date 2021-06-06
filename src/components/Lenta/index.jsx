import React from 'react';
import { getRandomMediaAPI } from '../../api';
import Preloader from '../Preloader';
import './lenta.scss';
export default function Lenta() {
    const [media, setMedia] = React.useState([]);
    React.useEffect(() => {
        getRandomMediaAPI().then((res) => setMedia(res)).then(() => 'ошибка');
    }, [])

    const toMedia = (s) => {
        window.location.href = `id${s.uid}_${s.id}`;
    }
    return (
        <>
            {media.length ?    
                <div className="lenta">
                        {media.map((s,index) => 
                            <div onClick={() => toMedia(s)} className="lenta__item" key={index}>
                                {s.mediaLink.split('.').pop() === 'jpg' ?
                                        <div>
                                            <img src={s.mediaLink} alt="photos"/>
                                            <b>{s.mediaName}</b>
                                        </div>:
                                        <div>
                                            <video>
                                                <source src={s.mediaLink} />
                                            </video>
                                            <b>{s.mediaName}</b>
                                        </div>
                                }
                                <i>{s.channelName}</i>
                            </div>
                        )}
                </div>
            : <Preloader />}
        </>
    )
}
