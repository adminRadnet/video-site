import React, {useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { replaceSpaces, nameToPermalink, tryFn } from "./lib/util"

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
import Categories from "./components/Categories"

//get videos
//get current filter
//throw that in a video track

function VideosToPlay({videos}){
  let match = useRouteMatch()
  return (
    <div>
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
  //works if the current video playlist is "Home", but doesn't find
  //all videos
  //maybe a separate video call to vimeo instead using the id?
  let {videoUrl} = useParams()
  if(videos.length > 0){
  window.scrollTo(0,0)
  console.log(videos)
  const videoData = videos.filter(video => nameToPermalink(video.name) === videoUrl)[0]
  let videoLink = videoData ? videoData.link : ''
  const getVideoId = (link) => {
    //if no link, then find more videos
    const retlink = link ? link.split("https://vimeo.com/")[1].split("/")[0] : "";
    return retlink;
  };

  //Get video from URL
  let video = (
    <>
    
    <Link to="/"><span className="btn btn-dark mb-4">Back</span></Link>
    <iframe
      title="video-player"
      className="main-video"
      src={`https://player.vimeo.com/video/${getVideoId(videoLink)}?autoplay=1`}
      allowFullScreen
    />
    <h2 className="mt-4">{videoData.name}</h2>
    <p>{videoData.tags.map(tag => <span>{`#${tag.tag} `}</span>)}</p>
    <p>{videoData.description}</p>
    {/* <VideoTrack videos={videos} title="You May Also Like" /> */}
    </>
  )  
  return video
  }else {
    return <h1>Loading Video</h1>
  }
}


const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());
    dispatch(getFilters());
  },[dispatch]);

  let videos = useSelector((state) => state.allVideos, shallowEqual);
  //let filteredData = useSelector((state) => state.filteredData, shallowEqual);
  videos = videos.map(video => {
    video.permalink = nameToPermalink(video.name)
    return video;
  })
  let filters = useSelector((state)=>state.filterData, shallowEqual)

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
                <Home filters={filters} videos={videos} darkMode={darkMode} />
              </Route>
            </Switch>
            </Container>
          </div>
        </Router>
      </div>
  );
};

export default App;
