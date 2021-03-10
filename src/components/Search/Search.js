import React, {useState, useEffect, useRef} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import _, { set } from "lodash"
import {Link} from 'react-router-dom'


const replaceSpaces = (str) => {
    str = str.replace(/(\.|-|\||\|)/g, "")
    str = str.replace(/(\s\s)/g, "-")
    return str.replace(/\s/g, "-") 
  }

const Search = () => {

    const searchInput = useRef()
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (searchInput.current && !searchInput.current.contains(event.target)) {
                setResults([])

            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchInput]);

    const videos = useSelector(state => state.allVideos, shallowEqual)
    let [results, setResults] = useState([])
    const handleSearch = _.debounce(() => {
        let searchTerm = searchInput.current.value
        setResults(videos.filter(video => {
            let patt = new RegExp(searchTerm, 'ig')
            if(video.name.match(patt)){
                return video;
            }
        }))
    }, 300)

    return (
        <>

        <div className="searches">
        <input onChange={handleSearch} ref={searchInput} className="mt-3 search form-control" type="text" name="Search" placeholder="Search" />
        <ul id="search-results" className={`search-results ${results.length <= 0 ? 'd-none' : ''}`}>
            {results.map(result => <li><Link onClick={()=>{setResults([]); searchInput.current.value = ""}} to={`/video/${replaceSpaces(result.name.toLowerCase())}`}>{result.name}</Link></li>)}
        </ul>
        </div>

        </>
    )
}

export default Search