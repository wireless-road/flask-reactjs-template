import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Login from "./components/Login";
import Main from "./components/main";
import Register from "./components/register";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { routesConstants } from "./constants/routes.constants";
import { Switch } from "react-router";

const App = () => {

	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/">
						<Redirect to={routesConstants.MAIN} />
					</Route>
					<Route path={routesConstants.MAIN} component={Main} />
					<Route path={routesConstants.LOGIN} component={Login} />
					<Route path={routesConstants.REGISTER} component={Register} />
					<Route>
						<Redirect to={routesConstants.MAIN} />
					</Route>
				</Switch>
			</div>
		</Router>
		)
	}
	
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)