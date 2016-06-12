import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyAppBar from './components/myAppBar';
import {appBarHeight} from '../dimensions/dimensions';
import MyAppBody from './components/myAppBody';
import {stringEn} from '../strings/strings';
import {stringKo} from '../strings/strings_korean';
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

    recommendations: _.range(4).map((c) => ({
        exp: "For travelling alone",
        items: _.range(7).map((r) => (
            {
                cid: (7 * c + r).toString(), // Just for testing
                name: 'Seolark',
                address: 'Seoraksan-ro, Sokcho-si, Gangwon-do',
                latitude: 38.119444,
                longitude: 128.465556,
                img: "images/seolark_highres.jpg",
                starRating: 3,
                reviews: [
                    {
                        cid: "1",
                        placeName: "Seorak",
                        userName: 'nick',
                        starRating: 5,
                        date: '2016.06.07',
                        content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
                    },
                    {
                        cid: "1",
                        placeName: "Seorak",
                        userName: 'nick',
                        starRating: 1,
                        date: '2016.05.01',
                        content: 'Imma never come \'ere again, I can tell ya that!'
                    },
                    {
                        cid: "1",
                        placeName: "Seorak",
                        userName: 'nick',
                        starRating: 3,
                        date: '2016.04.02',
                        content: 'Good!'
                    },
                ]
            })
        )}
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
                cid: "13",
                placeName: 'Seorak',
                userName: 'sherlock',
                starRating: 5,
                date: '2016.06.07',
                content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
            },
            {
                cid: "13",
                placeName: 'Seorak',
                userName: 'holmes',
                starRating: 1,
                date: '2016.05.01',
                content: 'Imma never come \'ere again, I can tell ya that!'
            },
            {
                cid: "13",
                placeName: 'Seorak',
                userName: 'watson',
                starRating: 3,
                date: '2016.04.02',
                content: 'Good!'
            },
        ]
    }
    )),

    reviews: [
        {
            cid: "13",
            placeName: 'Seorak',
            userName: 'Seolark',
            starRating: 5,
            date: '2016.06.07',
            content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
        },
        {
            cid: "13",
            placeName: 'Seorak',
            userName: 'Mt. Everest',
            starRating: 1,
            date: '2016.05.01',
            content: 'Imma never come \'ere again, I can tell ya that!'
        },
        {
            cid: "13",
            placeName: 'Seorak',
            userName: 'Jeju Island',
            starRating: 3,
            date: '2016.04.02',
            content: 'Good!'
        },
    ]
};

// Example format of _place_
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
            cid: "13",
            placeName: 'Seorak',
            userName: 'Brendan',
            starRating: 5,
            date: '2016.06.07',
            content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
        },
        {
            cid: "13",
            placeName: 'Nick',
            userName: 'Seolark',
            starRating: 1,
            date: '2016.05.01',
            content: 'Imma never come \'ere again, I can tell ya that!'
        },
        {
            cid: "13",
            placeName: 'Adam',
            userName: 'Seolark',
            starRating: 3,
            date: '2016.04.02',
            content: 'Good!'
        },
    ]
};


class Main extends React.Component {
    /*
        Specifications:

        * user:
            - uid: string
            - nickname: string
            - age: string
            - gender: string
            - nationality: string
            - recommendations: list of JSON, where each JSON object is of the following format:
                                    {
                                        exp: recommendation category (string)
                                        items: list of recommended places
                                    }
                               Outer list corresponds to the categories.
            - likedPlaces: list of places (JSON objects)
            - reviews: list of json objects, format specified above.
            
        * place: Place information (updated when a certain place is clicked)
            - cid: string
            - name: string
            - address: string
            - latitude: float
            - longitude: float
            - img (source url) : string
            - starRating: integer
            - reviews: list of json objects, format as above.
     */

    constructor(props) {
        super(props);
        console.log(stringEn);
        console.log(stringEn.appTitle);

        this.state = {
            info: {
                user: null,
                query: null,
                bodyPage: "main page",
                place: null,
                strings: stringEn,
                english: true
            }
        };

        this.updateSessionStorage = this.updateSessionStorage.bind(this);
        this.changeAppLanguage = this.changeAppLanguage.bind(this);
        this.fetchInitialInformationFromServer = this.fetchInitialInformationFromServer.bind(this);
        this.fetchRecommendationsFromServer = this.fetchRecommendationsFromServer.bind(this);
        this.handlePlaceClick = this.handlePlaceClick.bind(this);
        this.handlePlaceLike = this.handlePlaceLike.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
        this.fetchInitialInformationFromServer();
    }

    updateSessionStorage() {
        window.sessionStorage.user = JSON.stringify(this.state.info.user);
    }
    
    changeAppLanguage() {
        if (this.state.info.english) {
            this.state.info.strings = stringEn;
            this.state.info.english = false;
        } else {
            this.state.info.strings = stringKo;
            this.state.info.english = true;
        }
        
        this.setState(this.state);
    }

    fetchInitialInformationFromServer() {
        /*
          Fetch ALL information about the user (nickname, gender, places he liked, ..., initial set of recommendations, etc).
          using the UID stored in sessionStorage, and store the retrieved information in sessionStorage.
         */

        if (!window.sessionStorage.user) {
            var uid = window.sessionStorage.uid;
            var user = {}, place = null;

            $.ajax({
                url: "/api/userinfo?uid=" + uid,
                type: 'get',
                async: false,
                cache: false,
                success: function(data) {
                    if (data.result == 1) {
                        user.uid = uid;
                        user.firstlogin = (data.userprofile.numpref >= 10);
                        user.nickname = data.userprofile.nickname;
                        user.age = data.userprofile.age;
                        if (data.userprofile.sex == 0) user.gender = "Male";
                        else if (data.userprofile.sex == 1) user.gender = "Female";
                        else user.gender = "ETC.";
                        user.nationality = data.userprofile.nationality;
                    }
                },
                error: function(request, status, error) {
                    console.error(error);
                }
            });
            
            $.ajax({
                url:
                "/api/recommend?uid=" + uid +
                "&age=0"+ //+ user.age +
                "&sex=none"+ //+ user.gender +
                "&travStyle=1" + // TEMP
                "&area=1", // TEMP
                type: 'get',
                async: false,
                cache: false,
                success: function(data) {
                    if (data.result == 1) {
                        user.recommendations = [{}, {}, {}, {}];
                        for (var i=0; i < 4; i++) {
                            user.recommendations[i].exp = data.data.exp;
                            user.recommendations[i].items = [];
            
                            for (var j=0; j < data.data.items.length; j++) {
                                user.recommendations[i].items.push(data.data.items[j].item);
                            }
                        }
                    } else if (data.result == 0) user.recommendations = [{'exp':'No Data', items:[]}];
                },
                error: function(request, status, error) {
                    console.error(error); // alert(error);
                }
            });
            
            $.ajax({
                url: "/api/getlike?uid=" + uid,
                type: 'get',
                cache: false,
                async: false,
                success: function(data) {
                    user.likedPlaces = [];
                    if (data.result == 1) {
                        for (var i=0; i < data.data.length; i++) {
                            user.likedPlaces.push(data.data[i].item);
                        }
                    }
                },
                error: function(request, status, error) {
                    console.error(error); // alert(error);
                }
            });
            
            $.ajax({
                url: "/api/getreviewByUID?uid=" + uid,
                type: 'get',
                cache: false,
                async: false,
                success: function(data) {
                    user.reviews = [];
                    if (data.result == 1) {
                        for (var i=0; i < data.items.length; i++) {
                            user.reviews.push(data.items[i]);
                        }
                    }
                },
                error: function(request, status, error) {
                    console.error(error); // alert(error);
                }
            });
            
            console.log(user);

            this.state.info.user = user; //_user_;
            this.updateSessionStorage();
        } else {
            // If data is in the sessionStorage, retrieve from there.
            this.state.info.user = JSON.parse(window.sessionStorage.user);
        }
    }

    fetchRecommendationsFromServer(categories) {
        var recList =
            categories.map(
                function(category) {
                    var recommendations = {'exp':'', 'items':[]};

                    /*
                    TODO: Routine for fetching list of places for a single recommendation category goes here
                    @param category: String
                    */

		    $.ajax({
                        url: // Need to change
			"/api/recommend?uid=" + window.sessionStorage.uid +
			              "&age=" + window.sessionStorage.user.age +
				      "&sex=" + window.sessionStorage.user.gender +
				      "&travStyle=1" + // TEMP
				      "&area=1", // TEMP
	                type: 'get',
			async: false,
			cache: false,
			success: function(data) {
			  if (data.result == 1) {
				for (var j=0; j < data.data.items.length; j++) {
                                  recommendations.items.push(data.data.items[j].item);
			      }
			  } else if (data.result == 0) recommendations = [];
			},
                        error: function(request, status, error) {
                          console.error(error); // alert(error);
			}
		    });
                    recommendations.exp = category; // Need to change

                    return recommendations;
                }
            );
        
        this.state.info.user.recommendations = recList;
        this.state.info.bodyPage = "main page";
        this.updateSessionStorage();

        console.log("Recommendations fetched!");
        
        this.setState(this.state);
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
         // @param place: JSON object, with format specified as above.
        if (this.state.info.user.likedPlaces.length == 0) var duplicate = false;
        else { var duplicate =
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
        }
        
        if (!duplicate) {
            /* TODO: Routine for updating user's liked places in the server goes here */
	    $.ajax({
                url: "/api/like?uid=" + window.sessionStorage.uid + "&cid=" + place.cid,
                type: 'get',
                cache: false,
                async: false,
                success: function(data) {
                    if (data.result == 1) {
		        this.state.info.user.likedPlaces.unshift(place);
			this.updateSessionStorage();
                        console.log("Place liked!");
                    } else if (data.result == 2) {
                        console.error("Already liked");
                    } else {
                        console.error("Like error");
                    }
                },
                error: function(request, status, error) {
                    console.error(error);
                }
            });
        } else {
            console.log("Duplicate entry.");
        }
    }

    handleReviewSubmit(review) {
        /*
        Take a review (json object) as the argument and add it to:
                (1) List of reviews of the place 
                (2) List of reviews of the user 

        DO NOT invoke this.setState(). We don't want the UI to be re-rendered.

        @param review: JSON object, format specified above.
         */

        /* TODO: Routine for updating user & place review in the server goes here */
	$.ajax({
            url: "/api/review",
            data: {'uid': window.sessionStorage.uid,
                   'cid': review.cid,
                   'content': review.content,
                   'starRating': review.starRating} 
	    type: 'post',
	    cache: false,
	    async: false,
	    success: function(data) {
	        if (data.result == 1) {
		    this.state.info.user.reviews.unshift(review);
		    this.state.info.place.reviews.unshift(review);
		    this.updateSessionStorage();
		    console.log("Review submitted!");
		} else if (data.result == 2) {
                    console.log("Review existed");
                } else {
                    console.error("Review error");
                }
            },
            error: function(request, status, error) {
	        console.error(error);
	    }
        });
    }

    render() {
        const appBarHandlers = {
            handleBackButtonClick: this.handleBackButtonClick,
            changeAppLanguage: this.changeAppLanguage
        };

        const bodyHandlers = {
            handlePlaceClick: this.handlePlaceClick,
            handlePlaceLike: this.handlePlaceLike,
            handleReviewSubmit: this.handleReviewSubmit,
            handleBackButtonClick: this.handleBackButtonClick,
            fetchRecommendationsFromServer: this.fetchRecommendationsFromServer
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













