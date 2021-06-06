import * as axios from "axios"
import { v4 as uuidv4 } from 'uuid';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/',
})

export function authorizeAPI(login, password) {
    return instance.get(`/users?login=${login}&password=${password}`);
}

export async function registrationAPI(login, password, channelName) {
    let id = await instance.get('/users').then(({data}) => data.length + 1);
    let uid = uuidv4();

    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("uid", JSON.stringify(uid));
    instance.post('users/', {
      id,
      uid,
      channelName,
      registrationAPI,
      login,
      password,
      avatar: "https://im0-tub-ru.yandex.net/i?id=b3b460f834fb8074b278650bf6bac5cc&n=13&exp=1",
      media: [],
      subscribe: [],
      subscribers: []
    });
}

export function getUserAPI(id) {
    return instance.get(`/users/${id}`);
}

export async function createPostAPI(mediaName, mediaLink, description, uid) {
    let media = await getUserAPI(uid).then(({data}) => {
        let id = data.media.length + 1;
        data.media.push({id, uid, mediaName, mediaLink, description, channelName: data.channelName});
        return data.media;
    });
    instance.patch(`/users/${uid}`, {media});
}

export async function subscribeAPI(id, userId) {
    let subscribe = await getUserAPI(id).then(({data}) => {
        data.subscribe.push(userId);
        return data.subscribe;
    });
    let subscribers = await getUserAPI(userId).then(({data}) => {
        data.subscribers.push(id);
        return data.subscribers;
    });
    instance.patch(`/users/${id}`, {subscribe});
    instance.patch(`/users/${userId}`, {subscribers});
}

export async function unSubscribeAPI(id, userId) {
    let subscribe = await getUserAPI(id).then(({data}) => {
        return data.subscribe.filter(s => s !== userId);
    });
    let subscribers = await getUserAPI(userId).then(({data}) => {
        return data.subscribers.filter(s => s !== id);;
    });
    instance.patch(`/users/${id}`, {subscribe});
    instance.patch(`/users/${userId}`, {subscribers});
}

export async function getSubscribersAPI(id) {
    const allSubscribers = [];
    let sub;
    await getUserAPI(id).then(({data}) => {
        sub = data.subscribers;
    })

    for (let i = 0; i < sub.length; i++) {
        await getUserAPI(sub[i]).then(({data}) => {
           allSubscribers.push(data);
       })
    }
    return allSubscribers;
}

export async function getSubscribeAPI(id) {
    const allSubscribe = [];
    let sub;
    await getUserAPI(id).then(({data}) => {
        sub = data.subscribe;
    })

    for (let i = 0; i < sub.length; i++) {
        await getUserAPI(sub[i]).then(({data}) => {
            allSubscribe.push(data);
       })
    }
    return allSubscribe;
}

export async function getRandomMediaAPI() {
    const lenta = [];
    let max = await instance.get('/users').then(({data}) => data.length);
    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * (max)) + 1;
        await getUserAPI(random).then(({data}) => {
            if (data.media.length) {
                let rand = Math.floor(Math.random() * (data.media.length));
                lenta.push(data.media[rand]);
            }
        })
    }
    return lenta;
}