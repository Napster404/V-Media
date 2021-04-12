import React from 'react'
import './SidebarRow.css'

import { Avatar } from '@material-ui/core'

const SidebarRow = ({ src, title }) => {
    return (
        <div className='sidebarRow'>
            
            {src && <Avatar
                className="sidebarRow__avatar"
                style={{ "height": "25px", "width": "25px" }}
                src={src}
            />}
            
            <p>{title}</p>
        </div>
    )
}

export default SidebarRow
