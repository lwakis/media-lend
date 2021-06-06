import React from 'react';
import { createPostAPI } from '../../api';
import './addMedia.scss';
export default function AddMedia() {

    const [mediaName, setMediaName] = React.useState('');
    const [mediaLink, setMediaLink] = React.useState('');
    const [description, setDescription] = React.useState('');
    const createPost = (mediaName, mediaLink, description) => {
        createPostAPI(mediaName, mediaLink, description, localStorage.getItem('id'))
    }
    return (
        <div className="add__media">
            <div className="add__media-item">
                <span>Добавить изображение</span>
                <input placeholder="Название картинки" onChange={(e) => setMediaName(e.target.value)} value={mediaName}  type="text"/>
            </div>
            <div className="add__media-item">
                <span>Перейдите по этой <a target="_blank" rel="noopener noreferrer" href="https://oshi.at">ссылке</a></span>
                <span>Загрузите картинку/видео и вставьте ссылку в поле ниже</span>
                <input placeholder="Ссылка на картинку/видео" onChange={(e) => setMediaLink(e.target.value)} value={mediaLink}  type="text"/>
            </div>
            <div className="add__media-item">
                <span></span>
                <input placeholder="Краткое описание" onChange={(e) => setDescription(e.target.value)} value={description} type="text"/>
            </div>
                <button onClick={() => createPost(mediaName, mediaLink, description)}>Опубликовать</button>

        </div>
    )
}
