import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
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
import {grey200, black, darkBlack} from 'material-ui/styles/colors';


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
    },

    reviewStyle: {
        flex: 1, 
    },
    
    listStyle: {
        margin: dp(15)
    },
    
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
    },
    
    nameStyle: {
        flex: 1
    },
    
    starStyle: {
        flex: 1,
        alignSelf: 'flex-end'
    },
    
    oneStarStyle: {
        height: dp(20)
    }
};


const reviews = [
    {
        name: 'Brendan',
        starRating: 5,
        date: '2016.06.07',
        content: 'This place is fantastic! The food is amazing, the people are kind, and the view is magnificent. I would certainly come here again!'
    },

    {
        name: 'Mark',
        starRating: 1,
        date: '2016.05.01',
        content: 'Imma never come \'ere again, I can tell ya that!'
    },

    {
        name: 'Hansen',
        starRating: 3,
        date: '2016.04.02',
        content: 'Good!'
    },
];



export default class MyPlaceReviews extends React.Component {
    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.reviewStyle}>
                    <List style={styles.listStyle}>
                        {
                            reviews.map((item) => (
                                <div>
                                    <div style={styles.containerStyle}>
                                        <Subheader style={styles.nameStyle}>{item.date}</Subheader>
                                        <div style={styles.starStyle}>
                                            {
                                                _.range(item.starRating).map((e) =>
                                                    <ToggleStar style={styles.oneStarStyle}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <ListItem
                                    primaryText={item.name}
                                    secondaryText={item.content}
                                    secondaryTextLines={2}
                                    />
                                    <Divider />
                                </div>
                            ))
                        }
                    </List>
                </Paper>
            </div>
        );
    }
}






















