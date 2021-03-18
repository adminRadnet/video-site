import React from 'react' 

export default function Loading({isLoading=false}){
    return isLoading ? <div>Loading</div> : ''
}