import React, {useEffect, useState, useRef} from 'react';
import {Toolbar, Drawer, Divider} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {useDispatch, useSelector} from "react-redux";
import {doSelectPost} from "../actions/api";

const useStyles = makeStyles( (theme) => ({
    drawer: {
        width: 200,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 200,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const SideList = () => {
    const classes = useStyles();
    const posts = useSelector( state => state.postState );
    const dispatch = useDispatch();

    const handleClick = (item) => {
        dispatch(doSelectPost(item.id));
    }

    return (
                    <List>
                        {posts["posts"].map((text, index) => (
                            <ListItem button key={text["title"]} onClick={() => handleClick(text)}>
                                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                <ListItemText primary={text["title"]}/>
                            </ListItem>
                        ))}
                    </List>
    )
}

const SideNav = ({posts}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(doSelectPost(100));
    }

    return (
            <Drawer variant="permanent" className={classes.drawer} classes={{paper: classes.drawerPaper}}>
                <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button key="InboX">
                                <ListItemIcon> <MailIcon /> </ListItemIcon>
                                <ListItemText primary="Telegram"/>
                            </ListItem>
                            <ListItem button key="Email">
                                <ListItemIcon> <MailIcon /> </ListItemIcon>
                                <ListItemText primary="Email"/>
                            </ListItem>
                        </List>
                        <Divider />
                       <SideList posts={posts}/>
                        <Divider />
                        <List>
                            <ListItem button key="task" onClick={() => handleClick()}>
                                <ListItemIcon> <MailIcon /> </ListItemIcon>
                                <ListItemText primary="Task"/>
                            </ListItem>
                        </List>
                   </div>
            </Drawer>
    );
};

const mapStateToProps = state => ({
    posts: state.postState,
});

export default SideNav;


