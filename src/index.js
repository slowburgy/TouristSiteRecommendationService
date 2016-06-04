import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyAppBar from './myAppBar'
import MyPageTab from './myPageTab';
import MySiteList from './mySiteList';
import MyCategoryList from './myCategoryList';
import MyProfilePage from './myProfilePage';
import MyMainPageTab from './myMainPageTab';
import MyPlacePage from './myPlacePage';
import MySearchBar from './mySearchBar';
import Paper from 'material-ui/Paper';
import MyRecommendationBar from './myRecommendationBar';
import {dp, verticalDP} from '../dimensions/dimensions';


injectTapEventPlugin();

console.log("hello, react!");
console.log(window.innerHeight);
console.log(window.innerWidth);


const muiTheme = getMuiTheme({
    appBar: {
        height: verticalDP(100)
    }
});

const root = {
    display: 'flex',
    flexDirection: 'column'
};


class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div> 
                    <MyAppBar />
                    <div>
                        <MyRecommendationBar />
                        <MyCategoryList />
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


