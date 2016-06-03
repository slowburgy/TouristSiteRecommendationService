import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appTitle} from '../strings/strings';
import MyAppRightIcons from './myAppRightIcons';
import MyMainPageTab from './myMainPageTab';

// TODO: Use <MyPageTab />

export default class MyAppBar extends React.Component {
    render() {
        return (
            <AppBar style={{position: 'fixed', opacity: 0.4}}
                title={appTitle}
                iconElementRight={<MyAppRightIcons />}
            />
        );
    }
}

