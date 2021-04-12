import React from 'react'
import './Home.css'

import HomeLeft from './HomeLeft'
import Feed from '../Feed/Feed'
import HomeRight from './HomeRight'

const Home = () => {
    return (
        <div className='home'>
            <HomeLeft />
            <Feed isAdmin={true} />
            <HomeRight />
        </div>
    )
}

export default Home
