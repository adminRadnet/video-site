import React, {useRef, useEffect, useState} from 'react'
import Video from '../Video'
let token = process.env.REACT_APP_VIMEO_TOKEN

const VideoTrack = ({filter, ...props}) => {
    let title = filter.name
    let [videos, setVideos] = useState([])
    let uri = `https://api.vimeo.com/me${filter.metadata.connections.videos.uri}`
    
    useEffect(()=>{
        fetch(uri, { 
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(data => data.json())
        .then(res => {
            setVideos(res.data)
        })    
    }, [])
    
    const scroll = useRef()
    let scrollStep = 500;
    return (
        <>
        <div style={{position:`relative`}}>
            <h2 className="mt-5 mb-5">{title}</h2>
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