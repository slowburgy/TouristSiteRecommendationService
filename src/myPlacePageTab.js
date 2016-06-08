import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {rate, moreSnapshots, review} from '../strings/strings';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import {Tab, Tabs} from 'material-ui/Tabs';
import {mapWeatherContainerHeight, mapWeatherContainerWidth, placePageTab, appBarHeight} from '../dimensions/dimensions';
import {_} from 'underscore';
import {horizontalDP, verticalDP, dp} from '../dimensions/dimensions';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import {grey200, black} from 'material-ui/styles/colors';



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
        margin: dp(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    nameStyle: {
        flex: 1,
        fontSize: dp(40),
        fontWeight: 'bold',
        marginTop: dp(20)
    },
    
    starStyle: {
        flex: 1,
        // alignSelf: 'flex-end',
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
        // alignItems: 'center',
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

    listStyle: {
        // marginLeft: dp(10),
        // marginRight: dp(10)
    },
    
    fillerStyle: {
        height: verticalDP(30)
    }
};


const data = {
    name: 'Seolark',
    img: 'images/seolarkimage.jpg',
    starRating: 3
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
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(value) {
        console.log("Toggled! " + value);
    }

    render() {
        return (
            <Paper style={styles.root} id="place_page_tab">
                <div style={styles.headerStyle} >
                    <div style={styles.nameStyle}>{data.name}</div>
                    <div style={styles.starStyle}>
                    {
                        _.range(data.starRating).map((e) => (
                            <ToggleStar style={styles.oneStarStyle} />
                        ))
                    }
                    </div>
                    <div style={styles.infoStyle}>
                        Gangwondo, something something something j.
                    </div>
                </div>
                <List style={styles.listStyle}>
                    <ListItem primaryText="Like this place" leftIcon={<ActionFavorite />} />
                    <ListItem primaryText="Rate this place" leftIcon={<ToggleStar />} />
                    <ListItem primaryText="View/write reviews" leftIcon={<ContentCreate />} />
                </List>
                <div style={styles.fillerStyle}></div>
                <div style={styles.containerStyle}>
                    <div style={styles.mapBorderStyle}>
                        <img src="images/googlemap.png" style={styles.mapStyle} />
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
            </Paper>
        );
    }
}


// <ListItem primaryText="More snapshots" leftIcon={<ImageAddAPhoto />} />
