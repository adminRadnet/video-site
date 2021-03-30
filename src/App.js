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
import Categories from "./components/Categories"
import VideoPage from './components/VideoPage'
import Footer from './components/Footer'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());
    dispatch(getFilters());
  },[dispatch]);

  let videos = useSelector((state) => state.allVideos, shallowEqual);
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
              <Switch>
                <Route path="/about" render={()=><About />}/>
                <Route path="/video" render={()=><VideoPage videos={videos} />} />
                <Route path="/category" render={()=>{
                  
                  return <Categories />
                }} />
                <Route path="/" render={()=><Home filters={filters} videos={videos} darkMode={darkMode} />} />
              </Switch>
              </Container>
              <Footer />
          </div>
        </Router>
      </div>
  );
};

export default App;
