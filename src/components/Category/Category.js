import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, shallowEqual, useDispatch} from "react-redux"
import {tryFn} from "../../lib/util"
import {setFilter} from '../../actions'
import {Container, Card} from 'react-bootstrap'

export default function Category({filterData}){

    //Refactor
    let dispatch = useDispatch()
    let {categoryId} = useParams()
    let categoryName = categoryId.replace(/-/g, " ")
    let data = filterData.filter(obj => obj.name === categoryName)[0]
    let videoFilter = tryFn(()=>data.metadata.connections.videos.uri)
    let description = tryFn(()=>data.description)
    let [loading, setLoading] = useState(false)
    let videos = []

    useEffect(()=>{
        //something to look into - why so many re-renders
        //forcing time so the filter can get the right set of videos
        setTimeout(()=>{
            dispatch(setFilter(videoFilter))
        }, 500)
    }, [dispatch, videoFilter])
    videos = useSelector((state)=>state.allVideos, shallowEqual)
    let currentFilter = useSelector((state)=>state.currentFilter, shallowEqual)
    //get videos associated with filter

    console.log(currentFilter, videoFilter);
    let out = (currentFilter === videoFilter.replace("/albums/",'').replace('/videos', '')) ? (
        <div>
            <div className="text-center">
            <h2 className="mt-5 pt-5">{categoryName}</h2>
            <p className="mt-4 mb-4">{description}</p>
            </div>
            <Container>
                {videos.map((video, idx)=><div key={idx}>{video.name}</div>)}
            </Container>
        </div>
    ): 'Getting Your Videos'
    return out
}