import React, {useRef} from 'react'
import Video from '../Video'

const VideoTrack = ({title, videos, ...props}) => {
    const scroll = useRef()
    let scrollStep = 500;
    return (
        <>
        <div style={{position:`relative`}}>
            <h2 className="mt-3 mb-4">{title}</h2>
            <span className="carousel-control-prev-icon track-control track-left" onMouseDown={()=>{
                let sl = scroll.current.scrollLeft;
                if(sl - scrollStep <= 0) {
                    scroll.current.scrollTo({top:0, left:0, behavior: 'smooth'})
                }else {
                    scroll.current.scrollTo({top:0, left:(sl - scrollStep), behavior:'smooth'})
                }
            }}></span><span className="carousel-control-next-icon track-control track-right" onMouseDown={() => {
                let sl = scroll.current.scrollLeft;
                let cw = scroll.current.scrollWidth;
                if(sl + scrollStep > cw) {
                    scroll.current.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                }else {
                    scroll.current.scrollTo({top:0, left:(sl + scrollStep), behavior: 'smooth'})
                }
            }}></span>
        </div>
        <div ref={scroll} className="videos-wrapper" {...props}>
            
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