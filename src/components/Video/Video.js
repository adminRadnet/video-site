import React from "react";

const Video = ({ video = {}, isIframe = false }) => {

  const getVideoId = (link) => {
    const retlink = link ? link.split("https://vimeo.com/")[1].split("/")[0] : "";
    return retlink;
  };

  const out = isIframe ? (
    <iframe
      title="video-player"
      className="main-video"
      src={`https://player.vimeo.com/video/${getVideoId(
        video.link
      )}?autoplay=1`}
      allowFullScreen
    />
  ) : (
    <div className="video-card">
       <img alt="video" src={`${video.pictures.sizes[5].link}`} />
       {video.tags
        ? video.tags.map((tag, id) => (
            <span className="tag-item" key={id}>
              {" "}
              {tag.tag}{" "}
            </span>
          ))
        : ""}{" "}
      <p className="title-main mt-2"> {video.name} </p>{" "}
    </div>
  );

  return out;
};

export default Video;
