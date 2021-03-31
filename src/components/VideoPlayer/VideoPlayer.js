import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, useHistory, useLocation } from "react-router-dom";
import {nameToPermalink} from "../../lib/util"
import Seo from '../../components/Seo'
const VideoPlayer = ({videos}) => {
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
      <Seo title={`${videoData.name}`} />
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

  export default VideoPlayer