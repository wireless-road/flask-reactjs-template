import React, {useEffect, useState, useRef} from 'react';
import { Container, Typography, AppBar, Toolbar, IconButton, Drawer, Divider } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { restAPIconstants } from "../constants/restAPI.constants";
import { doLogin, doLogout } from "../actions/authentication";
import { authenticationConstants } from "../constants/authentication.constants";
import { routesConstants } from "../constants/routes.constants";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles( (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const TopNav = () => {
    const classes = useStyles();

   	const history = useHistory();

   	const dispatch = useDispatch();

    if( useSelector(state => state.authenticationState.state) !== authenticationConstants.LOGIN_SUCCESS ) {
        history.push(routesConstants.LOGIN);
    }

    const bearer_access_header = 'Bearer ' + useSelector(state => state.authenticationState.access_token);
    const bearer_refresh_header = 'Bearer ' + useSelector(state => state.authenticationState.refresh_token);

    const handleSubmit = event => {
        event.preventDefault()

        fetch(routesConstants.LOGOUT_ACCESS_TOKEN, {
            method: 'POST',
            headers: { 'Authorization': bearer_access_header },
        }).then( response => response.json() )
            .then(responce => {
                if(responce["status"] === restAPIconstants.RESPONCE_OK) {


                    fetch(routesConstants.LOGOUT_REFRESH_TOKEN, {
                        method: 'POST',
                        headers: { 'Authorization': bearer_refresh_header },
                    }).then( response => response.json() )
                        .then(responce => {
                            if(responce["status"] === restAPIconstants.RESPONCE_OK) {
                                dispatch(doLogout({
                                    "username": responce["username"],
                                    "state": authenticationConstants.LOGOUT_SUCCESS
                                }));
                                localStorage.setItem("username", '');
		                        localStorage.setItem("access_token", '');
		                        localStorage.setItem("refresh_token", '');
		                        localStorage.setItem("state", '');

                           		history.push(routesConstants.LOGIN);
                            }
                        })

                }
            })

    }

    return (
            <AppBar position={"fixed"} className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        News
                    </Typography>
                    <div>
                        <Button color="inherit" onClick={handleSubmit}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
    );
};

const mapDispatchToProps = dispatch => ({
    logout: username => dispatch(doLogout({
                                    "username": username,
                                    "state": authenticationConstants.LOGOUT_SUCCESS
                                }))
})

export default TopNav;


