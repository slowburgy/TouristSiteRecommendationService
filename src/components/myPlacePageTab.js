import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import {mapWeatherContainerHeight, mapWeatherContainerWidth, placePageTab, appBarHeight} from '../../dimensions/dimensions';
import {_} from 'underscore';
import {verticalDP, dp} from '../../dimensions/dimensions';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import {grey200, black} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


const styles = {
    root: {
        position: 'fixed',
        top: appBarHeight,
        opacity: 0.7,
        backgroundColor: grey200,
        height: verticalDP(1000) - appBarHeight,
        width: placePageTab,
    },
    
    headerStyle: {
        marginBottom: dp(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    nameStyle: {
        flex: 1,
        fontSize: dp(40),
        fontWeight: 'bold',
    },
    
    starStyle: {
        flex: 1,
        marginTop: dp(20)
    },
    
    oneStarStyle: {
        height: dp(30)
    },
    
    infoStyle: {
        fontSize: dp(20),
        marginTop: dp(20),
        whiteBreak: 'normal'
    },

    containerStyle: {
        marginTop: dp(10),
        width: mapWeatherContainerWidth,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },

    mapBorderStyle: {
        borderStyle: 'solid',
        borderColor: black,
        borderWidth: dp(5),
        margin: dp(10)
    },

    mapStyle: {
        width: mapWeatherContainerWidth - dp(30),
        height: mapWeatherContainerHeight 
    },
    
    weatherStyle: {
        margin: dp(10),
        marginTop: dp(25),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    oneWeatherStyle: {
        textAlign: 'center',
        fontSize: dp(15),
        alignItems: 'center',
        justifyContent: 'center',
        margin: dp(20),
    },

    weatherIconStyle: {
        height: dp(40),
        marginTop: dp(5),
        marginBottom: dp(5),
    },

    fillerStyle: {
        height: verticalDP(30)
    },
};


const weathers = [
    {
        date: "06.10",
        weather: "Rain",
        temp: "14",
        img: 'images/partly_cloudy.png',
    },
    {
        date: "06.11",
        weather: "Rain",
        temp: "14",
        img: 'images/partly_cloudy.png',
    },
    {
        date: "06.12",
        weather: "Rain",
        temp: "14",
        img: 'images/partly_cloudy.png',
    },
    {
        date: "06.13",
        weather: "Rain",
        temp: "14",
        img: 'images/partly_cloudy.png',
    },
    {
        date: "06.14",
        weather: "Rain",
        temp: "14",
        img: 'images/partly_cloudy.png',
    },
];


export default class MyPlacePageTab extends React.Component {
    
    // TODO: fetch weathers
    
    constructor(props) {
        super(props);
        
        this.state = {
            open: false
        };

        this.handlePlaceLike = this.handlePlaceLike.bind(this, this.props.info.place);
        this.handleShowReviewPage = this.handleShowReviewPage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    componentDidMount() {
        var latLon = {
            lat: this.props.info.place.latitude,
            lng: this.props.info.place.longitude
        };
        
        // Google Map API
        var map = new google.maps.Map(document.getElementById('map'), {
            center: latLon,
            zoom: 8
        });

        var marker = new google.maps.Marker({
            position: latLon,
            map: map,
            title: this.props.info.place.name
        });
    }

    handlePlaceLike() {
        this.props.handlers.handlePlaceLike();
        console.log("Liked!");
        this.setState({open: true});
    }
    
    handleShowReviewPage() {
        this.props.handlers.handleShowReviewPage();
    }

    handleSnackbarClose() {
        this.setState({open: false});
    }
    
    handleBackButtonClick() {
        this.props.handlers.handleBackButtonClick();
    }

    render() {
        var strings = this.props.info.strings;
        
        return (
            <Paper style={styles.root} id="place_page_tab">
                <IconButton onTouchTap={this.handleBackButtonClick}>
                    <NavigationArrowBack />
                </IconButton>
                <div style={styles.headerStyle} >
                    <div style={styles.nameStyle}>{this.props.info.place.name}</div>
                    <div style={styles.starStyle}>
                    {
                        _.range(this.props.info.place.starRating).map((e) => (
                            <ToggleStar style={styles.oneStarStyle} />
                        ))
                    }
                    </div>
                    <div style={styles.infoStyle}>
                        {this.props.info.place.address}
                    </div>
                </div>
                <List>
                    <ListItem primaryText={strings.likePlace} onTouchTap={this.handlePlaceLike} leftIcon={<ActionFavorite />} /> 
                    <ListItem primaryText={strings.rateReviews} onTouchTap={this.handleShowReviewPage} leftIcon={<ToggleStar />} />
                </List>
                <div style={styles.fillerStyle}></div>
                <div style={styles.containerStyle}>
                    <div style={styles.mapBorderStyle}>
                        <div id="map" style={styles.mapStyle}></div>
                    </div>
                    <div style={styles.weatherStyle}>
                        {weathers.map(function (item) {
                            return (
                                <div style={styles.oneWeatherStyle}>
                                    <div>{item.date}</div>
                                    <img src={item.img} style={styles.weatherIconStyle}/>
                                    <div>{item.temp}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <Snackbar
                        open={this.state.open}
                        message={this.props.info.place.name + strings.added}
                        autoHideDuration={2000}
                        onRequestClose={this.handleSnackbarClose}
                    />
                </div>
            </Paper>
        );
    }
}

// TODO: add more snapshots
// <ListItem primaryText="More snapshots" leftIcon={<ImageAddAPhoto />} />

// <img src="images/googlemap.png" style={styles.mapStyle} />
