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

const style = {
    height: 500,
    // marginTop: 170,
    display: 'inline-block',
    position: 'fixed',
    alignSelf: 'right'
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
            <Tabs
                value={this.state.value}
                onChange={this.handleToggle}
            >
                <Tab label={myVisitedPlaces} value="a" ></Tab>
                <Tab label={myLikes} value="b"></Tab>
                <Tab label={myReviews} value="b"></Tab>
                <Tab label={changeProfileInfo} value="b"></Tab>
            </Tabs>
        );
    }
}

// export default class MyPageTab extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.handleToggle = this.handleToggle.bind(this);
//     }
//
//     handleToggle() {
//         console.log("Toggled!");
//     }
//
//     render() {
//         return (
//             <Paper zDepth={2} style={style}>
//                 <List>
//                     <Subheader>My Page Menus</Subheader>
//                     <ListItem primaryText={myVisitedPlaces} leftIcon={<ContentInbox />} onTouchTap={this.handleToggle} />
//                     <ListItem primaryText={myLikes} leftIcon={<ActionGrade />} onTouchTap={this.handleToggle} />
//                     <ListItem primaryText={myReviews} leftIcon={<ContentSend />} onTouchTap={this.handleToggle} />
//                     <ListItem primaryText={changeProfileInfo} leftIcon={<ContentDrafts />} onTouchTap={this.handleToggle} />
//                 </List>
//             </Paper>
//         );
//     }
// }
