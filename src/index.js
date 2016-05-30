import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyAppBar from './myAppBar'
import MyPageTab from './myPageTab';
import MySiteList from './mySiteList';
import MyCategoryList from './myCategoryList';
import MyProfilePage from './myProfilePage'

injectTapEventPlugin();

console.log("hello, react!");

const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500
    },
    appBar: {
        height: 50
    }
});

class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={{flex: 1, alignSelf: 'stretch', alignItems: 'stretch'}}>
                    <MyAppBar />
                    <div style={{alignSelf: 'stretch', alignItems: 'stretch', flex: 1, backgroundImage: 'images/success.png'}} >
                        <MyProfilePage />
                        <MyPageTab />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);


