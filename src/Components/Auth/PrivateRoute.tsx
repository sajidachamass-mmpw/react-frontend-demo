import React from "react";
import { Redirect,Route } from "react-router-dom";
import Home from '../Home';

const PrivateRoute = (props:any) => {
    const token = localStorage.getItem("auth");

    if (token) {
        return <Route {...props} component={Home} />
    } else {
        return <Redirect
            to={{
                pathname: "/login",
                state: { from: props.location }
            }}
        /> ;
    }

    return props;
};

export default PrivateRoute;