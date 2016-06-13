import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {appBarHeight} from '../dimensions/dimensions';
import MyLoginAppBar from './components/myLoginAppBar';
import MyPageOnFirstLogin from './components/myPageOnFirstLogin';
import {_} from 'underscore';

injectTapEventPlugin();

var randomPlaces = _.range(7).map((r) => (
{
    cid: r.toString(),
    name: 'Seolark',
    address: 'Seoraksan-ro, Sokcho-si, Gangwon-do',
    latitude: 38.119444,
    longitude: 128.465556,
    img: "images/seolark_highres.jpg",
    starRating: 3,
    reviews: [
        {
            name: 'sherlock',
            starRating: 5,
            date: '2016.06.07',
            content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
        },
        {
            name: 'holmes',
            starRating: 1,
            date: '2016.05.01',
            content: 'Imma never come \'ere again, I can tell ya that!'
        },
        {
            name: 'watson',
            starRating: 3,
            date: '2016.04.02',
            content: 'Good!'
        },
    ]
}));


const muiTheme = getMuiTheme({
    appBar: {
        height: appBarHeight
    }
});

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToMainPage = this.redirectToMainPage.bind(this);
        this.getRandomPlaceList = this.getRandomPlaceList.bind(this);
    }

    getRandomPlaceList() {
        /* TODO: Routine for getting a list of random places from the server goes here */
        randomPlaces = []

        $.ajax({
            url: "/api/randomplace",
            type: 'get',
            cache: false,
            async: false,
            success: function(data) {
                if (data.result == 1) {
                    for (var i=0; i<data.data.length; i++) {
                        randomPlaces.push(data.data[i].item);
                    }
                }
            }.bind(this),
            error: function(request, status, error) {
                console.error(error);
            }.bind(this)
        });

        return randomPlaces;
    }

    redirectToMainPage(placePreferenceList, userInfo) {
        /*
         Handler to redirect the new user from choosing preferred places to the main page. 
         (1) POST preferences and user information to the server
         (2) GET recommendations from the server
         (3) Redirect to the main page

         @param placePreferenceList: List of tuples (cid, preferenceScore)
         [["123", 5], ...]

         @param userInfo: JSON
         {
         nickname: string,
         age: number,
         gender: string,
         nationality: string,
         }
         */

        /* TODO: Routine for (1) & (2) goes here */
        var errored = false;

        $.ajax({
            url: "/api/signup?uid=" + window.sessionStorage.uid +
            "&age=" + userInfo.age +
            "&sex=" + userInfo.gender +
            "&travStyle=alone" +
            "&nickname=" + userInfo.nickname +
            "&nationality=" + userInfo.nationality,
            type: 'get',
            async: false,
            cache: false,
            success: function(data) {
                if (data.result < 0) {
                    errored = true;
                }
            }.bind(this),
            error: function(request, status, error) {
                console.error(error);
            }.bind(this)
        });

        for (var i=0; i<placePreferenceList.length; i++) {
            $.ajax({
                url: "/api/addpref?uid=" + window.sessionStorage.uid +
                "&cid=" + placePreferenceList[i][0] +
                "&pref=" + placePreferenceList[i][1],
                type: 'get',
                async: false,
                cache: false,
                success: function(data) {
                    if (data.result < 0) {
                        errored = true;
                    }
                }.bind(this),
                error: function(request, status, error) {
                    console.error(error);
                }.bind(this)
            });
        }
        if (!errored) window.location.href = 'main.html';
        else console.log("ERRORED");
    }

    render() {
        const bodyHandlers = {
            redirectToMainPage: this.redirectToMainPage
        };

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div >
                    <MyLoginAppBar />
                    <div>
                        <div style={{height: appBarHeight}} ></div>
                        <MyPageOnFirstLogin
                            places={this.getRandomPlaceList()}
                            handlers={bodyHandlers}
                        />
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

