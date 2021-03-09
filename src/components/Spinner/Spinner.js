import React from 'react'

const Spinner = ({isLoading}) => (
    isLoading ? <div>Loading... <br /><br /><div className="spinner-border text-success" role="status"></div></div> : ''
)

export default Spinner