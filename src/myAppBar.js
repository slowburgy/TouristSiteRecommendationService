import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appTitle} from '../strings/strings';
import MyAppRightIcons from './myAppRightIcons';
import MyPageTab from './myPageTab';
import MySiteList from './mySiteList';

// TODO: Use <MyPageTab />

export default class MyAppBar extends React.Component {
    render() {
        return (
            <div>
                <AppBar
                    title={appTitle}
                    iconElementRight={<MyAppRightIcons />}
                />
                <div style={{display: 'inline-block'}}>
                    <MyPageTab />
                    <MySiteList />
                </div>
            </div>
        );
    }
}

