let token = process.env.REACT_APP_VIMEO_TOKEN
let uriToFilter = (uri) => uri.replace('/videos','').replace('/albums/','')

export const getFilters = () => (dispatch) => {
  let url = "https://api.vimeo.com/me/albums"
  fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(data => data.json()).then(res => {
    let filteredData = res.data.filter(item => {
      let showFilter = (item.metadata.connections.videos 
                      && item.metadata.connections.videos.total > 10
                      && item.description
                      && item.privacy.view === "anybody")
      if(showFilter){
        return item
      }
    }) 
    dispatch({
      type: 'GET_FILTERS',
      payload: filteredData
    })
  })

}

export const getVideosByFilter = (uri) => (dispatch) => {
  let url = `https://api.vimeo.com/me/`
}


export const getVideos = (next=1) => (dispatch) => {
  let url = `https://api.vimeo.com/me/videos?per_page=100`

  fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(data => data.json()).then((res)=>{
    let videos = res.data

    videos = videos.filter(video => video.privacy.view === 'anybody')
    let last = res.paging.last.substr(res.paging.last.indexOf('=')+1)
    dispatch({
      type:'GET_VIDEOS',
      payload: {
        total: res.total,
        next: res.paging.next,
        prev: res.paging.previous,
        last: last,
        pageNo: res.page,
        videos: videos
      }
    })

    dispatch({
      type: 'CHANGE_PAGE',
      payload: next
    })
  })
}

export const loading = () => {
  return {
    type: 'IS_LOADING'
  }
}

export const setFilter = (uri='') => (dispatch) => {
  let filter = uriToFilter(uri)
  console.log('lol',filter)
  dispatch(getVideos(1, filter))
  dispatch({
    type: 'SET_FILTER',
    payload: filter
  })
}

export const setVideo = (id) => {
  return ({
    type: 'SET_VIDEO',
    payload: id
  })
}