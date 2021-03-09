import React, {useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import _ from "lodash";

import {
  getVideos,
  setVideo,
  loading,
  getFilters,
  setFilter,
} from "./actions";

import "bootstrap/dist/css/bootstrap.css";
import "./sass/index.scss";

import { Container } from 'react-bootstrap'

//components
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Browse from './components/Browse'
import VideoTrack from "./components/VideoTrack";

function Categories(){
  let match = useRouteMatch()
  return (
    <div>
      <h2>Categories</h2>
      <p></p>
      <Switch>
        <Route path={`${match.path}/:categoryId`}>
          <Category />
        </Route>
        <Route path={match.path}>
          <h2>Please select a category</h2>
        </Route>
      </Switch>
    </div>
  )
}

function Category(){
  let {categoryId} = useParams()
  return <h2>Requested category: {categoryId}</h2>
}

function VideosToPlay({videos}){
  let match = useRouteMatch()
  return (
    <div>
      <p></p>
      <Switch>
        <Route path={`${match.path}/:videoUrl`}>
          <VideoPlayer videos={videos} />
        </Route>
        <Route path={match.path}>
          <h2>Please select a video</h2>
        </Route>
      </Switch>
    </div>
  )
}

function VideoPlayer({videos}){
  let {videoUrl} = useParams()
  if(videos.length > 0){
  window.scrollTo(0,0)
  const videoData = videos.filter(video => video.permalink === videoUrl)[0]
  console.log(videoData)
  const getVideoId = (link) => {
    const retlink = link ? link.split("https://vimeo.com/")[1].split("/")[0] : "";
    return retlink;
  };

  let video = (
    <>
    <Link to="/"><span className="btn btn-dark mb-4">Back</span></Link>
    <iframe
      title="video-player"
      className="main-video"
      src={`https://player.vimeo.com/video/${getVideoId(videoData.link)}?autoplay=1`}
      allowFullScreen
    />
    <h2 className="mt-4">{videoData.name}</h2>
    <p>{videoData.tags.map(tag => <span>{`#${tag.tag} `}</span>)}</p>
    <p>{videoData.description}</p>
    <VideoTrack videos={videos} title="You May Also Like" />
    </>
  )  
  return video
  }else {
    return <h1>Loading Video</h1>

  }
}

const replaceSpaces = (str) => {
  str = str.replace(/(\.|-|\||\|)/g, "")
  str = str.replace(/(\s\s)/g, "-")
  return str.replace(/\s/g, "-") 
}

const App = () => {

  const [darkMode, setDarkMode] = useState(true)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos());
  },[dispatch]);

  let videos = useSelector((state) => state.allVideos, shallowEqual);
  videos = videos.map(video => {
    video.permalink = replaceSpaces(video.name.toLowerCase())
    return video;
  })

  return (
      <div className={`app ${darkMode ? 'dark': ''}`}>
        <Router>
          <div>
          <Header text="RadNet Videos" darkMode={darkMode} setDarkMode={setDarkMode} />
          <Container className="main" fluid>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/video">
                <VideosToPlay videos={videos} />
              </Route>
              <Route path="/category">
                <Categories />
              </Route>
              <Route path="/">
                <Home videos={videos} darkMode={darkMode} />
              </Route>
            </Switch>
            </Container>
          </div>
        </Router>
      </div>

  );
};

export default App;
