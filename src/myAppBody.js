import React from 'react';
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
import MyProfileEditPage from './myProfileEditPage';
import {dp, verticalDP} from '../dimensions/dimensions';
import {cyan50} from 'material-ui/styles/colors';
import MyLikedPlaces from './myLikedPlaces';
import MyPlacePageTab from './myPlacePageTab';
import MyPlaceReviews from './myPlaceReviews';
import MyReviews from './myReviews';
import MyLoginPage from './myLoginPage';
import {appBarHeight} from '../dimensions/dimensions';


export default class MyAppBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var BodyPage;
        var bodyPage = this.props.info.bodyPage;

        switch (bodyPage) {
            case "login page":
                BodyPage = () => (
                    <div>
                        <MyLoginPage />
                    </div>
                );
                break;

            case "main page":
                BodyPage = () => (
                    <div>
                        <MyRecommendationBar />
                        <MyCategoryList 
                            handlers={this.props.handlers}
                            info={this.props.info}
                        />
                    </div>
                );
                break;

            case "my page":
                BodyPage = () => (
                    <div>
                        <MyPageTab />
                        <MyProfilePage />
                    </div>
                );
                break;

            case "place page":
                BodyPage = () => (
                    <div>
                        <MyPlacePage 
                            handlers={this.props.handlers}
                        />
                    </div>
                );
                break;

            default:
                console.log("Invalid bodyPage value.");
        }

        return <BodyPage />;
    }




}







