import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyAppBar from './myAppBar';
import {appBarHeight} from '../dimensions/dimensions';
import MyAppBody from './myAppBody';
import {_} from 'underscore';

injectTapEventPlugin();


const muiTheme = getMuiTheme({
    appBar: {
        height: appBarHeight
    }
});

// Sample data for testing
var _user_ = {
    uid: "1",
    nickname: "rhapsodyjs",
    email: "rhapsody_js@kaist.ac.kr",
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
                reviews: [] // Unused, just for consistency of the place information format.
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
        reviews: [] // Unused, just for consistency of the place information format.
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

console.log(_user_);

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
            - email
            - gender
            - nationality
            - recommendations: list of list of places (json objects).
                               Outer list corresponds to the categories, inner list to the places within that category.
            - likedPlaces: same as recommendations
            - reviews: list of json objects (refer to _user_ above)
            
        * query: Query typed into the search bar
        
        * bodyPage: Type of the body page.
            (1) "login page": Default login page
            (2) "main page": Page of recommendations
            (3) "my page": My profile page
            (4) "place page": Page with the detailed information about a place
            
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
                bodyPage: "login page",
                place: null
            }
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.handleMyPageButtonClick = this.handleMyPageButtonClick.bind(this);
        this.handlePlaceClick = this.handlePlaceClick.bind(this);
        this.handlePlaceLike = this.handlePlaceLike.bind(this);
    }

    componentDidMount() {
        // this.setState(this.state);
    }

    handleLoginButtonClick() {
        /*
         Routine for OAuth verification (and server communication) goes here.
         ...
         @return: a JSON object _user_ for update this.state.user
         */
        
        // console.log();

        this.state.info.user = _user_;
        this.state.info.bodyPage = "main page";
        this.setState(this.state);
    }

    handleMyPageButtonClick() {
        this.state.info.user = _user_;
        this.state.info.bodyPage = "my page";
        this.setState(this.state);
    }
    
    handlePlaceClick(place) {
        this.state.info.user = _user_;
        this.state.info.bodyPage = "place page";

        // TODO: replace _place_ with place (the argument)
        this.state.info.place = _place_;
        this.setState(this.state);
    }

    handlePlaceLike(place) {
        this.state.info.user = _user_;
        this.state.info.bodyPage = "main page";
        this.state.info.user.likedPlaces.push(_place_);
        // DO NOT include this.setState(). We don't want the UI to be re-rendered.
    }

    render() {
        const appBarHandlers = {
            handleLoginButtonClick: this.handleLoginButtonClick,
            handleMyPageButtonClick: this.handleMyPageButtonClick,
        };

        const bodyHandlers = {
            handlePlaceClick: this.handlePlaceClick,
            handlePlaceLike: this.handlePlaceLike,
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













