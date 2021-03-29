import React from 'react' 
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useHistory, useLocation } from "react-router-dom";
import VideoPlayer from '../VideoPlayer/VideoPlayer'

const VideosPage = ({videos}) => {
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
  
  export default VideosPage