import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Registration from './components/Registration';
import Channel from './components/Channel';
import Lenta from './components/Lenta';
import {getUserAPI} from './api';
import Preloader from './components/Preloader';
import AddMedia from './components/AddMedia';
import Subscribers from './components/Subscribers';
import Post from './components/Post';
import Subscribe from './components/Subscribe';


function App() {
  const idLocal = JSON.parse(localStorage.getItem("id"));
  const [profile, setProfile] = React.useState([]);
  const [mediaInfo, setMediaInfo] = React.useState([]);
  React.useEffect(() => {
    if (/\/id/.test(window.location.pathname)) {
      const adres = window.location.pathname.match(/(\d+)/g);
      if (adres.length === 1) {
        getUserAPI(adres.join('')).then(({data}) => setProfile(data));
      } else {
        getUserAPI(adres[0]).then(({data}) => setMediaInfo(data.media[adres[1] - 1]));
      }
    }
  }, [idLocal])

  return (
    <Router>
      <div className="App">
        <Header id={idLocal} />
        <Switch>
            <Route exact path="/">
              {idLocal ? <Lenta /> : <Registration />}
            </Route>
            <Route exact path="/home">
              <Lenta />
            </Route>
            <Route path="/id:id"> 
              {mediaInfo.length !== 0 ? <Post mediaInfo={mediaInfo}/> :
                profile.length === 0 ? <Preloader/>  :
               <Channel profile={profile} id={idLocal}/> 
              }
            </Route>
            <Route path="/add">
                <AddMedia />
            </Route>
            <Route exact path="/subscribers">
              <Subscribers id={idLocal}/>
            </Route>
            <Route exact path="/subscribe">
              <Subscribe id={idLocal}/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;