import {React, useState } from 'react';
import './burger.scss';
import classNames from 'classnames';

export default function Burger() {
    const [burger, setBurger] = useState(false);

    const myChanel = () => {
        window.location.href = "/id" + JSON.parse(localStorage.getItem("id"));
    }
    const addPhoto = () => {
        window.location.href = "/add";
    }
    const mySubscribers = () => {
        window.location.href = "/subscribers";
    }
    const mySubscribe = () => {
        window.location.href = "/subscribe";
    }
    const exit = () => {
        localStorage.clear("id");
        localStorage.clear("uid");
        setBurger(false);
        window.location.href = "/";
    }
    return (
        <div className="burger">
            <img
             onClick={() => setBurger(!burger)} src="https://im0-tub-ru.yandex.net/i?id=b3b460f834fb8074b278650bf6bac5cc&n=13&exp=1" alt="avatar"/>
            <div className={classNames({'open': burger, 'close': !burger})}>
                <button onClick={() => myChanel()}>Мой канал</button>
                <button onClick={() => mySubscribers()}>Мои подписчики</button>
                <button onClick={() => mySubscribe()}>Мои подписки</button>
                <button onClick={() => addPhoto()}>Добавить файл</button>
                <button onClick={() => exit()}>Выйти</button>
            </div>
        </div>
    )
}
