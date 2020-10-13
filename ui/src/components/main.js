import React, {useEffect, useState, useRef} from 'react';
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import {routesConstants} from "../constants/routes.constants";
import {restAPIconstants} from "../constants/restAPI.constants";
import {makeStyles} from "@material-ui/core/styles";
import {authenticationConstants} from "../constants/authentication.constants";
import { doSetPosts } from "../actions/api";
import {useDispatch, useSelector} from "react-redux";
import MainWindow from "./MainWindow";
import {useHistory} from "react-router-dom";
import {doLogin} from "../actions/authentication";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));


const Main = ({posts}) => {

    const classes = useStyles();
   	const history = useHistory();
    const authState = useSelector( state => state.authenticationState );
    const postState = useSelector( state => state.postState.state );
    const dispatch = useDispatch();

    console.log("Main render");
    if( authState.state !==authenticationConstants.LOGIN_SUCCESS ) {
        history.push(routesConstants.LOGIN);
    }

    if(
        ( authState.state === authenticationConstants.LOGIN_SUCCESS )
        && ( postState === '' )
        ) {

        const bearer_access_header = 'Bearer ' + /*store.getState().authenticationState*/authState.access_token;
        const bearer_refresh_header = 'Bearer ' + /*store.getState().authenticationState*/authState.refresh_token;
        fetch(routesConstants.POSTS_GET_ALL, {
                method: 'GET',
                headers: { 'Authorization': bearer_access_header },
            }).then( response => response.json() )
                .then(responce => {
                    if(responce["status"] === restAPIconstants.RESPONCE_OK) {

                        dispatch(doSetPosts({
                            "payload": responce["message"],
                            "state": routesConstants.POSTS_GET_ALL
                        }));
                    } else if( responce["msg"] === "Token has expired" ) {
                        console.log("responce expired")


                        fetch(routesConstants.REFRESH_TOKEN, {
                                method: 'POST',
                                headers: { 'Authorization': bearer_refresh_header },
                            }).then( response => response.json() )
                                .then(responce => {
                                    if(responce["status"] === restAPIconstants.RESPONCE_OK) {

                                        dispatch(doLogin({
                                            "username": responce["username"],
                                            "access_token": responce["access_token"],
                                            "refresh_token": authState.refresh_token,
                                            "state": authenticationConstants.LOGIN_SUCCESS
                                        }))
                                        history.push(routesConstants.MAIN)

                                    }
                                })



                    }
                })

    }

    return (
        <div className={classes.root}>
            <TopNav />
            <SideNav />
            <MainWindow />
        </div>
    );
};

const mapStateToProps = state => ({
    posts: state.postState,
});

export default Main;

