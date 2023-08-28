/*
 * @Author: your name
 * @Date: 2021-08-16 13:36:34
 * @LastEditTime: 2021-09-07 17:43:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\srm-gauge-miniprogram\src\router\rooterView.tsx
 */
import React, { useEffect } from 'react';
import { Switch, Route, Redirect, HashRouter, BrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Tools from '../pages/tools/tools';
import Guide from '../pages/guide/guide';
import Mine from '../pages/mine/mine';
import PrivateRoute from './AuthGuard';
import NotFound from '../pages/notFound/notFound';
import ServerError from '../pages/serverError/serverError';
import { BASE_PATH } from '../config/config';

const RouterView = (props: any) => {

    useEffect(() => {

    }, [])

    return (
        <BrowserRouter>
            <Switch>
                {/* <PrivateRoute path=`/${BASE_PATH}/` exact component={Home} /> */}
                {/* <Redirect to=`/${BASE_PATH}/`></Redirect> */}
                <Route path={`/${BASE_PATH}/`} component={Home}></Route>
                <Route path={`/${BASE_PATH}/home`} component={Home}></Route>
                <Route path={`/${BASE_PATH}/notFound`} component={NotFound} />
                <Route path={`/${BASE_PATH}/serverError`} component={ServerError}></Route>

                <Route path={`/${BASE_PATH}/guide`} component={Guide} />
                <Route path={`/${BASE_PATH}/tools`} component={Tools} />
                <Route path={`/${BASE_PATH}/mine`} component={Mine} />
                <Route path={`/${BASE_PATH}/toolsVue`} component={Home}></Route>
                <Route path={`/handbook/`} component={Home}></Route>
                <Route path={`/${BASE_PATH}/mine`} component={Home}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default RouterView;