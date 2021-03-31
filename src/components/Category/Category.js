import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector, shallowEqual, useDispatch} from "react-redux"
import {replaceSpaces, tryFn} from "../../lib/util"
import {setFilter} from '../../actions'
import {Container, Card, Row, Col} from 'react-bootstrap'
import Video from '../Video/Video'
import { filter } from 'lodash-es'

let token = process.env.REACT_APP_VIMEO_TOKEN

export default function Category({filterData=[]}){
    let [videos, setVideos] = useState([])

    //get category (aka filter) from url
    let {categoryId} = useParams()
    //adapt for the name property on the category data
    let categoryName = categoryId.replace(/-/g, " ")
    let data = filterData ? filterData.filter(obj => obj.name === categoryName)[0] : []
    
    //see if there's a uri (from vimeo) to get all the videos associated w/this filter
    let videoFilter = tryFn(()=>data.metadata.connections.videos.uri)
    let description = tryFn(()=>data.description)

    let uri = `https://api.vimeo.com/me${videoFilter}`


    useEffect(()=>{
        if(videoFilter && description){
            fetch(uri, { 
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then(data => data.json())
            .then(res => {
                setVideos(res.data)
            }) 
        }else {
            setVideos([])
        }
 
    }, [])

    console.log(videos)
    
    let out = videos.length ? (
        <div className="category">

            <div className="text-center">
            <h2 className="mt-5 pt-5">{categoryName}</h2>
            <p className="mt-4 mb-4">{description}</p>
            </div>
            <Container>
                <Row>
                {videos.map((video, idx)=>{
                    return <Video key={idx} video={video} isIframe={false} className="mt-5 mb-5" />
                })}
                </Row>
            </Container>
        </div>
    ): 'Getting Your Videos'
    return (
        <div>
            {out}
        </div>
        )
}