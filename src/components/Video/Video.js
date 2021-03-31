import React from "react";
import {Link} from 'react-router-dom'
import {nameToPermalink} from '../../lib/util'

const Video = ({ video = {}, isIframe = false}) => {
  const getVideoId = (link) => {
    const retlink = link ? link.split("https://vimeo.com/")[1].split("/")[0] : "";
    return retlink;
  };


  const out = (
    <div className="video-card">
     <Link to={`/video/${nameToPermalink(video.name)}`}>
       <img alt="video" src={`${video.pictures.sizes[5].link}`} />
       {video.tags
        ? video.tags.map((tag, id) => (
            <span className="tag-item" key={id}>
              {"#"}
              {tag.tag}{" "}
            </span>
          ))
        : ""}{" "}
      <p className="title-main mt-2"> {video.name} </p>{" "}
      </Link>
    </div>
  );

  return out;
};

export default Video;
