import React, {useEffect, useState, useRef} from 'react';
import {Toolbar, Drawer, Divider} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles( (theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    typography: {
        fontSize: 16,
    }
}));


const MainWindow = () => {
    const classes = useStyles();
    const postState = useSelector( state => state.postState);

    return (
            <main className={classes.content}>
                <Toolbar />
                    <Typography paragraph className={classes.typography}>
                        <ReactMarkdown source={postState.selected_post_idx === -1 ? '' : postState.posts[postState.selected_post_idx-1].body} />
                    </Typography>
            </main>
    );
};

const mapStateToProps = state => ({
    posts: state.postState,
});

export default MainWindow;
