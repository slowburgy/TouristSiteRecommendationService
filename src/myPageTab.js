import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {myLikes, myReviews, myVisitedPlaces, changeProfileInfo} from '../strings/strings';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {Tabs, Tab} from 'material-ui/Tabs';
import {appBarHeight} from '../dimensions/dimensions';
import {grey200, grey800} from 'material-ui/styles/colors';


const styles = {
    paperStyle: {
        opacity: 0,
        height: appBarHeight
    },
    
    tabStyle: {
        backgroundColor: grey200,
        color: grey800,
    }
};


export default class MyPageTab extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {value: "a"}
    }

    handleToggle(value) {
        console.log("Toggled! " + value);
    }

    render() {
        return (
            <div>
                <Paper style={styles.paperStyle}></Paper>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleToggle}
                >
                    <Tab label={myLikes} value="b" style={styles.tabStyle}></Tab>
                    <Tab label={myReviews} value="b" style={styles.tabStyle}></Tab>
                    <Tab label={changeProfileInfo} value="b" style={styles.tabStyle}></Tab>
                </Tabs>
            </div>
        );
    }
}

