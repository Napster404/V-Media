import React from 'react'
import { useSelector } from 'react-redux'
import './HomeLeft.css'

import HomeLeftRow from './HomeLeftRow'
import { Telegram, InfoOutlined } from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'

const HomeLeft = () => {

    const user = useSelector(selectUser)

    return (
        <div className='homeLeft'>
            <HomeLeftRow src={user.avatarSrc} title={user.username} path={'/user/' + user.userId} />
            <HomeLeftRow Icon={Telegram} title='Messenger' path={'/messenger'} />
            <HomeLeftRow Icon={InfoOutlined} title='About Us' path={'/about'} />
        </div>
    )
}

export default HomeLeft
