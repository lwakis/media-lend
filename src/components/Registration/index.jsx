import React from 'react';
import './registration.scss';
import {authorizeAPI, registrationAPI} from '../../api';

export default function Registration() {
    const [channelName, setChannelName] = React.useState("");
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pageReg, setPageReg] = React.useState(false);

    async function authorize(login, password) {
        if (login.length > 3 && password.length > 3 && login.length <= 15 && password.length <= 15) {
            await authorizeAPI(login, password).then(({data}) => {
                    localStorage.setItem("id", JSON.stringify(data[0].id));
                    localStorage.setItem("uid", JSON.stringify(data[0].uid));
                    window.location.href = 'home';
            })
        }
    }
    async function registration(login, password, channelName) {
        if (login.length > 3 && password.length > 3 && login.length <= 15 && password.length <= 15 && channelName.length <= 20) {
            await registrationAPI(login, password, channelName);
        } else {
            alert("Длина логина и/или пароля не подходит для регистрации");
        }
    }
    return (
        <div className="registration">
            <div className="registration__container">
                {pageReg ? <h1>Регистрация</h1> : <h1>Авторизация</h1>}
                <hr/>
                {pageReg && <input onChange={(e) => setChannelName(e.target.value)} value={channelName} placeholder="Название канала" type="text"/>}
                <input onChange={(e) => setLogin(e.target.value)} value={login} placeholder="Логин" type="text"/>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Пароль" type="password"/>
                <div className="registration__btn">
                    {pageReg 
                    ? <>
                        <button onClick={() => registration(login, password, channelName)}>Зарег.</button>
                        <button onClick={() => setPageReg(false)}>Авторизация</button>
                      </>
                    : <>
                        <button onClick={() => authorize(login, password)}>Войти</button> 
                        <button onClick={() => setPageReg(true)}>Регистрация</button> 
                      </>
                    }
                </div>
            </div>
        </div>
    )
}
