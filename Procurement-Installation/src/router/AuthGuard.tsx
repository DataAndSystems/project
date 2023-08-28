import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(com: any) {
    let { component: Component, authed, ...rest } = com;

    //检查验证
    const checkLogin = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <Route
            {...rest}
            render={(props) => checkLogin()
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            }
        />
    )
}


export default PrivateRoute;