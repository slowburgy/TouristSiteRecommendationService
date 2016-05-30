import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {recommended, recommendedForGender, recommendedForAge, recommendedForNationality} from '../strings/strings';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

const style = {
    height: 500,
    // display: 'fixed', // Makes div/Paper fill the whole page
    // justifyContent: 'center',
    // margin: 10,
    // marginLeft: 100,
    // marginRight: 100,
    // marginTop: 0,
    display: 'inline-block',
    // position: 'fixed',
    // alignSelf: 'right'
};


export default class MyMainPageTab extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        console.log("Toggled!");
    }

    render() {
        return (
            <Paper zDepth={2} style={style}>
                <List>
                    <Subheader>Menus</Subheader>
                    <ListItem primaryText={recommended} leftIcon={<ContentInbox />} onTouchTap={this.handleToggle} />
                    <ListItem primaryText={recommendedForGender} leftIcon={<ActionGrade />} onTouchTap={this.handleToggle} />
                    <ListItem primaryText={recommendedForAge} leftIcon={<ContentSend />} onTouchTap={this.handleToggle} />
                    <ListItem primaryText={recommendedForNationality} leftIcon={<ContentDrafts />} onTouchTap={this.handleToggle} />
                </List>
            </Paper>
        );
    }
}
