import React from 'react'
import './Team.css'

import Sidebar from './Sidebar'
import Feed from '../Feed/Feed'
import { Autorenew } from '@material-ui/icons'

const Team = () => {

    const isAdmin = true;
    const isSelected = false;

    return (
        <div className='team'>
            <Sidebar />
            {(isSelected)? (
                <Feed isAdmin={isAdmin}/>
            ):(
                <div className='team__select'>
                    <Autorenew />
                    <p>Select a team to get Feed</p>
                </div>
            )}

        </div>
    )
}

export default Team
