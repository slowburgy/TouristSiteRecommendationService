import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {rate, moreSnapshots, review} from '../strings/strings';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

const style = {
    height: 500,
    // margin: 10,
    display: 'inline-block',
    position: 'fixed',
    alignSelf: 'right'
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
                    <Subheader>Place Menus</Subheader>
                    <ListItem primaryText={moreSnapshots} leftIcon={<ContentInbox />} onTouchTap={this.handleToggle} />
                    <ListItem primaryText={rate} leftIcon={<ActionGrade />} onTouchTap={this.handleToggle} />
                    <ListItem primaryText={review} leftIcon={<ContentSend />} onTouchTap={this.handleToggle} />
                </List>
            </Paper>
        );
    }
}
