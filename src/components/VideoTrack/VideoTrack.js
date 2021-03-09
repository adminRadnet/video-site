import React from 'react'
import Video from '../Video'

const VideoTrack = ({title, videos, ...props}) => {
    return (
        <>
        <div>
            <h2 className="mt2 mb-4">{title}</h2>
        </div>
        <div className="videos-wrapper" {...props}>

            <div className="videos-track" >
            {videos ? videos.map((video, id)=>
                <Video key={id} video={video} isIframe={false} />
            ) : '' }
            </div>
        </div>
        </>
    )
}

export default VideoTrack