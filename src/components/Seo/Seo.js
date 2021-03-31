import React from 'react'
import {Helmet} from 'react-helmet'

const Seo = ({title}) => {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>RadNet Videos | {title ?? 'Home'}</title>
      </Helmet>
    )
}

export default Seo