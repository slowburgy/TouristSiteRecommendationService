import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyAppBar from './components/myAppBar';
import {appBarHeight} from '../dimensions/dimensions';
import MyAppBody from './components/myAppBody';
import {_} from 'underscore';

injectTapEventPlugin();


const muiTheme = getMuiTheme({
    appBar: {
        height: appBarHeight
    }
});

// _user_, _place_: Sample data for testing
var _user_ = {
    uid: "1",
    firstLogin: true,
    nickname: "rhapsodyjs",
    age: 24,
    gender: "Male",
    nationality: "Korea, Republic Of",

    recommendations: _.range(4).map((c) => (
        _.range(7).map((r) => (
            {
                cid: (7*c + r).toString(), // Just for testing
                name: 'Seolark',
                address: 'Seoraksan-ro, Sokcho-si, Gangwon-do',
                latitude: 38.119444,
                longitude: 128.465556,
                img: "images/seolark_highres.jpg",
                starRating: 3,
                reviews: [
                    {
                        name: 'nick',
                        starRating: 5,
                        date: '2016.06.07',
                        content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
                    },
                    {
                        name: 'brendan',
                        starRating: 1,
                        date: '2016.05.01',
                        content: 'Imma never come \'ere again, I can tell ya that!'
                    },
                    {
                        name: 'you',
                        starRating: 3,
                        date: '2016.04.02',
                        content: 'Good!'
                    },
                ]
            })
        )
    )),

    likedPlaces: _.range(7).map((r) => (
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
            }
        ]
    }
    )),

    reviews: [
        {
            name: 'Seolark',
            starRating: 5,
            date: '2016.06.07',
            content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
        },
        {
            name: 'Mt. Everest',
            starRating: 1,
            date: '2016.05.01',
            content: 'Imma never come \'ere again, I can tell ya that!'
        },
        {
            name: 'Jeju Island',
            starRating: 3,
            date: '2016.04.02',
            content: 'Good!'
        },
    ]
};

var _place_ = {
    cid: "1",
    name: 'Seolark',
    address: 'Seoraksan-ro, Sokcho-si, Gangwon-do',
    latitude: 38.119444,
    longitude: 128.465556,
    img: 'images/seolark_highres.jpg',
    starRating: 3,
    reviews: [
        {
            name: 'Seolark',
            starRating: 5,
            date: '2016.06.07',
            content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
        },
        {
            name: 'Seolark',
            starRating: 1,
            date: '2016.05.01',
            content: 'Imma never come \'ere again, I can tell ya that!'
        },
        {
            name: 'Seolark',
            starRating: 3,
            date: '2016.04.02',
            content: 'Good!'
        },
    ]
};


class Main extends React.Component {
    /*
        this.state.info specification:

        * user: 
            - uid
            - nickname
            - age
            - gender
            - nationality
            - recommendations: list of list of places (json objects).
                               Outer list corresponds to the categories, inner list to the places within that category.
            - likedPlaces: same as recommendations
            - reviews: list of json objects (refer to _user_ above)
            
        * query: Query typed into the search bar
        
        * bodyPage: Type of the body page. Stack of strings for emulating "back" button in a browser.
            (1) "main page": Main page with recommendations
            (2) "place page": Page with the detailed information about a place
            
        * place: Place information (updated when a certain place is clicked)
            - cid
            - name
            - address
            - latitude: float
            - longitude: float
            - img (source url)
            - starRating: integer
            - reviews: list of json objects
     */

    constructor(props) {
        super(props);

        this.state = {
            info: {
                user: null,
                query: null,
                bodyPage: "main page",
                place: null
            }
        };

        this.updateSessionStorage = this.updateSessionStorage.bind(this);
        this.fetchInformationFromServer = this.fetchInformationFromServer.bind(this);
        this.handlePlaceClick = this.handlePlaceClick.bind(this);
        this.handlePlaceLike = this.handlePlaceLike.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
        this.fetchInformationFromServer();
    }

    updateSessionStorage() {
        window.sessionStorage.user = JSON.stringify(this.state.info.user);
    }

    fetchInformationFromServer() {
        /*
         TODO: Fetch ALL information about the user (nickname, gender, places he liked, ..., initial set of recommendations, etc).
               using the UID stored in sessionStorage, and store the retrieved information in sessionStorage.
         */

        if (!window.sessionStorage.user) {

            var uid = window.sessionStorage.uid;
            var user, place = null;

            /* Routine for fetching information from the server (i.e., updating user) using the uid comes here */

            // _user_ is used just for testing. Replace it with the real value.
            user = _user_;

            this.state.info.user = user;
            this.updateSessionStorage();
            console.log(window.sessionStorage.user);

        } else {
            // If data is in the sessionStorage, retrieve from there.

            this.state.info.user = JSON.parse(window.sessionStorage.user);
        }
    }

    handlePlaceClick(place) {
        this.state.info.bodyPage = "place page";

        this.state.info.place = place;
        this.setState(this.state);
    }
    
    handleBackButtonClick() {
        this.state.info.bodyPage = "main page";
        this.setState(this.state);
    }

    handlePlaceLike(place) {
        /*
         DO NOT invoke this.setState(). We don't want the UI to be re-rendered.

         TODO: Replace _place_ with state.info.place and update user information in the server.
         */

        var duplicate =
            this.state.info.user.likedPlaces
            .map(
                function(e) {
                    return e.cid == place.cid;
                })
                .reduce(
                    function(p, c) {
                        return p || c;
                    }
                );
        
        if (!duplicate) {
            /* Routine */
            
            this.state.info.user.likedPlaces.unshift(place);
            this.updateSessionStorage();
            
            console.log("Place liked!");
        } else {
            console.log("Duplicate entry.");
        }
    }

    handleReviewSubmit(placeReview, userReview) {
        /*
        Take a review (json object) as the argument and add it to:
                (1) Place review list
                (2) User review list

        DO NOT invoke this.setState(). We don't want the UI to be re-rendered.

        TODO: Update user & place review information in the server
         */

        this.state.info.user.reviews.unshift(userReview);
        this.state.info.place.reviews.unshift(placeReview);
        this.updateSessionStorage();
        
        console.log("Review submitted!");
    }

    render() {
        const appBarHandlers = {
            handleBackButtonClick: this.handleBackButtonClick
        };

        const bodyHandlers = {
            handlePlaceClick: this.handlePlaceClick,
            handlePlaceLike: this.handlePlaceLike,
            handleReviewSubmit: this.handleReviewSubmit,
            handleBackButtonClick: this.handleBackButtonClick,
        };

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div > 
                    <MyAppBar
                        info={this.state.info}
                        handlers={appBarHandlers}
                    />
                    <MyAppBody
                        info={this.state.info}
                        handlers={bodyHandlers}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);













