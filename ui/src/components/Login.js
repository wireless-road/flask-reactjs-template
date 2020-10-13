import React, {useEffect, useState, useRef} from 'react';
import {Container, Link, Typography} from '@material-ui/core';
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


const Login = () => {
    const classes = useStyles();
    const [user, setUser] = useState({username: "", password: ""})

   	const history = useHistory();

    const authState = useSelector( state => state.authenticationState);
    const dispatch = useDispatch();

    if( authState.state === authenticationConstants.LOGIN_SUCCESS ) {
		localStorage.setItem("username", authState.username);
		localStorage.setItem("access_token", authState.access_token);
		localStorage.setItem("refresh_token", authState.refresh_token);
		localStorage.setItem("state", authState.state);

        history.push(routesConstants.MAIN);
    }

    const handleUser = event => {
        setUser({ ...user, username: event.target.value });
    }

    const handlePassword = event => {
        setUser({ ...user, password: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault()

        fetch(routesConstants.LOGIN, {
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
                        "state": authenticationConstants.LOGIN_SUCCESS
                    }));
                }
            })
    }

    return (
        <Container className={classes.container} maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label={<Typography variant="headline" component="h4">Username</Typography>} name="email" size="small" variant="outlined" onChange={handleUser}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label={<Typography variant="headline" component="h4">Password</Typography>} name="password" size="small" type="password" variant="outlined" onChange={handlePassword}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="gray" fullWidth type="submit" variant="contained">
                            {"SIGN IN"}
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Link href="#">
                            {"Forgot password?"}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={"#" + routesConstants.REGISTER}>
                            {"Don't have an account? Sign up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

Login.propTypes = {
    login: PropTypes.string.isRequired
}

Login.defaultProps = {
    login: "LOG IN"
}

export default Login;

