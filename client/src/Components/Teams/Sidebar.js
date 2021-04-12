import { Button } from '@material-ui/core'
import React from 'react'
import './Sidebar.css'

import SidebarRow from './SidebarRow'

const Sidebar = () => {

    const isTeam = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Open Dialog Box
    }

    return (
        <div className='sidebar'>

            <div className='sidebar__new'>
                <Button onClick={handleSubmit}>
                    Create New Team
                </Button>
            </div>

            <div className='sidebar__heading'>
                <p> Your Teams </p>
            </div>

            {(isTeam) ? (
                <div className='sidebar__rows'>
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                </div>

            ) : (
                    <div className='sidebar__error'>
                        <p> Nothing to Display </p>
                    </div>
                )}

        </div >
    )
}

export default Sidebar
