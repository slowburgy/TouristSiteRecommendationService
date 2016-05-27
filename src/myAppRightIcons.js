import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {myDrawerTitle, myLikes, myReviews, myVisitedPlaces, changeProfileInfo} from '../strings/strings';


export default class MyAppRightIcons extends React.Component {

    iconStyle() {
        return {
            color: 'white',
            fontWeight: 'bold'
        };
    }

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.iconStyle = this.iconStyle.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        console.log(this.state.open);
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div>
                <FlatButton
                    label="LOGIN"
                    labelStyle={this.iconStyle()}
                />
                <FlatButton
                    label="MY PAGE"
                    labelStyle={this.iconStyle()}
                    onTouchTap={this.handleToggle}
                />
                <Drawer width={400} openSecondary={true} open={this.state.open}>
                    <div>
                        <AppBar
                            title={myDrawerTitle}
                            iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
                        />
                        <List>
                            <ListItem primaryText={myVisitedPlaces} leftIcon={<ContentInbox />} onTouchTap={this.handleToggle} />
                            <ListItem primaryText={myLikes} leftIcon={<ActionGrade />} onTouchTap={this.handleToggle} />
                            <ListItem primaryText={myReviews} leftIcon={<ContentSend />} onTouchTap={this.handleToggle} />
                            <ListItem primaryText={changeProfileInfo} leftIcon={<ContentDrafts />} onTouchTap={this.handleToggle} />
                        </List>

                    </div>
                </Drawer>
            </div>
        );
    }
}
