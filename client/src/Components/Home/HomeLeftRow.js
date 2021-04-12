import React from 'react'
import { useHistory } from 'react-router-dom'
import './HomeLeftRow.css'

import { Avatar } from '@material-ui/core'

const HomeLeftRow = ({ src, Icon, title, path }) => {

    const history = useHistory()

    return (
        <div className='homeLeftRow' onClick={() => history.replace(path)}>

            {src && <Avatar
                style={{ "height": "25px", "width": "25px", 'margin': "10px 10px" }}
                src={src}
            />}

            {Icon && <Icon />}
            <p>{title}</p>
        </div>
    )
}

export default HomeLeftRow
