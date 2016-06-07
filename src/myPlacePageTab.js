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
import {appBarHeight, placePageTab} from '../dimensions/dimensions';
import {_} from 'underscore';
import {horizontalDP, verticalDP, dp} from '../dimensions/dimensions';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import {grey50} from 'material-ui/styles/colors';

const styles = {
    root: {
        position: 'fixed',
        top: appBarHeight,
        opacity: 0.7,
        backgroundColor: grey50,
        height: verticalDP(1000) - appBarHeight,
        // width: placePageTab,
    },
    
    headerStyle: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        margin: dp(30)
    },
    
    nameStyle: {
        flex: 1,
        fontSize: dp(30),
        fontWeight: 'bold'
    },
    
    starStyle: {
        flex: 1,
        // alignSelf: 'flex-end',
        marginTop: dp(20)
    },
    
    oneStarStyle: {
        height: dp(30)
    },
    
    listStyle: {
        marginLeft: dp(20),
        marginRight: dp(20)
    }
};


const data = {
    name: 'Seolark',
    img: 'images/seolarkimage.jpg',
    starRating: 3
};


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
            <div style={styles.root}>
                <div style={styles.headerStyle} >
                    <div style={styles.nameStyle}>{data.name}</div>
                    <div style={styles.starStyle}>
                    {
                        _.range(data.starRating).map((e) => (
                            <ToggleStar style={styles.oneStarStyle} />
                        ))
                    }
                    </div>
                </div>
                <List >
                    <ListItem primaryText="Like this place" leftIcon={<ActionFavorite />} />
                    <ListItem primaryText="View/write reviews" leftIcon={<ContentCreate />} />
                    <ListItem primaryText="More snapshots" leftIcon={<ImageAddAPhoto />} />
                </List>
            </div>
        );
    }
}


