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
import MyProfilePage from './myProfilePage';
import MyMainPageTab from './myMainPageTab';
import MyPlacePage from './myPlacePage';

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
                <div >
                    <MyAppBar />
                    <div>
                        <MyMainPageTab />
                        <MyMainPageTab />
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


