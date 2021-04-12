import React from 'react'

import { Dialog } from '@material-ui/core'
import { makeStyles, StylesProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
        borderRadius: 30
    }
});

const StyledDialog = ({ open, onClose, component }) => {
    const classes = useStyles();
    return (
        <StylesProvider injectFirst>
            <Dialog
            open={open}
            onClose={onClose}
            classes={{
                paper: classes.paper
            }}
        >
            {component}
        </Dialog>
        </StylesProvider>
    )
}

export default StyledDialog
