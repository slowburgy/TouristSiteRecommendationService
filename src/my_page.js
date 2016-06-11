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
            (1) "login page": Default login page
            (2) "page on first login": page in which a new user is asked to select favorite places
            (3) "main page": Main page with recommendations
            (4) "my page": My profile page
            (5) "place page": Page with the detailed information about a place
            
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
                user: JSON.parse(window.sessionStorage.user),
                query: null,
                bodyPage: "my page",
                place: null
            }
        };
        
        this.updateSessionStorage = this.updateSessionStorage.bind(this);
        this.handlePlaceClick = this.handlePlaceClick.bind(this);
        this.handlePlaceLike = this.handlePlaceLike.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.handleProfileEditSubmit = this.handleProfileEditSubmit.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    updateSessionStorage() {
        window.sessionStorage.user = JSON.stringify(this.state.info.user);
    }
    
    handlePlaceClick(place) {
        this.state.info.bodyPage = "place page";

        this.state.info.place = place;
        this.setState(this.state);
    }
    
    handleBackButtonClick() {
        this.state.info.bodyPage = "my page";
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

        TODO: Update user & place information in the server
         */

        this.state.info.user.reviews.unshift(userReview);
        this.state.info.place.reviews.unshift(placeReview);
        this.updateSessionStorage();
        
        console.log("Review submitted!");
    }

    handleProfileEditSubmit(profileInfo) {
        /*
        Take a profileInfo (json object) as the argument and update the user info:
            profileInfo spec:
            {
                nickname: string,
                gender: string,
                nationality: string
            }

        DO NOT invoke this.setState(). We don't want the UI to be re-rendered.

        TODO: Update user information in the server
        */ 
        
        this.state.info.user.nickname = profileInfo.nickname;
        this.state.info.user.age = profileInfo.age;
        this.state.info.user.gender = profileInfo.gender;
        this.state.info.user.nationality = profileInfo.nationality;
        this.updateSessionStorage();
        
        console.log("profile edited!");
    }

    render() {
        const appBarHandlers = {
            handleBackButtonClick: this.handleBackButtonClick
        };

        const bodyHandlers = {
            handlePlaceClick: this.handlePlaceClick,
            handlePlaceLike: this.handlePlaceLike,
            handleProfileEditSubmit: this.handleProfileEditSubmit,
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













