import React, {useEffect, useState, useRef} from 'react';
import {Container} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { doLogin } from "../actions/authentication";
import { routesConstants } from "../constants/routes.constants";
import { authenticationConstants } from "../constants/authentication.constants";
import { restAPIconstants } from "../constants/restAPI.constants";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles( (theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));


const Register = () => {
    const classes = useStyles();
    const [user, setUser] = useState({username: "", password: "", password_confirm: "", email: ""})

   	const history = useHistory();
   	const dispatch = useDispatch();

    const handleUserName = event => {
        console.log("user: ", event.target.value)
        setUser({ ...user, username: event.target.value });
    }

    const handlePassword = event => {
        console.log("password: ", event.target.value)
        setUser({ ...user, password: event.target.value });
    }

    const handlePasswordConfirm = event => {
        console.log("password_confirm: ", event.target.value)
        setUser({ ...user, password_confirm: event.target.value });
    }

    const handleEmail = event => {
        setUser({ ...user, email: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log("register user: ", user)

        if( user["password"] !== user["password_confirm"] ) {
            console.log("password doesn't match!")
            return
        }
//*
        fetch(routesConstants.REGISTER, {
            method: 'POST',
            body: JSON.stringify( user ),
            headers: { 'Content-Type': 'application/json' },
        }).then( response => response.json() )
            .then(responce => {
                if(responce["status"] === restAPIconstants.RESPONCE_OK) {
                    dispatch(doLogin({
                        "username": responce["username"],
                        "access_token": responce["access_token"],
                        "refresh_token": responce["refresh_token"],
                        // "state": authenticationConstants.REGISTER_REQUESTED
                        "state": authenticationConstants.LOGIN_SUCCESS
                    }));
                    history.push(routesConstants.LOGIN);
                }
            })

 //*/
    }

    return (
        <Container className={classes.container} maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Username" name="username" size="small" variant="outlined" onChange={handleUserName}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" name="email" size="small" variant="outlined" onChange={handleEmail}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Password" name="password" size="small" type="password" variant="outlined" onChange={handlePassword}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Repeat password" name="password_confirm" size="small" type="password" variant="outlined" onChange={handlePasswordConfirm}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="gray" fullWidth type="submit" variant="contained">
                            "SIGN UP"
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Register;

