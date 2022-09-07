import React from "react";
import { Redirect,Route } from "react-router-dom";
import ListUsers from '../Users/index';

const PrivateRoute = (props:any) => {
    const token = localStorage.getItem("auth");


    if (token) {
        console.log("Yes, Token exist");
        return <Route {...props} component={ListUsers} />
    } else {
        console.log("No Token");
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