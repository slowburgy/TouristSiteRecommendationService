import React from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan50} from 'material-ui/styles/colors';
import {dp, horizontalDP, verticalDP} from '../dimensions/dimensions';
import DropDownMenu from 'material-ui/DropDownMenu'
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import {List, ListItem} from 'material-ui/List';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: verticalDP(600),
        backgroundImage: 'url("images/hqdefault.jpg")'
    },

    child: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalDP(480)
    },

    msgStyle: {
        fontSize: dp(50),
        textAlign: 'center',
        marginBottom: dp(30)
    },

    barStyle: {
        flex: 1,
        width: horizontalDP(600),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: cyan50,
        opacity: 0.9,
    },

    buttonsBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        // margin: dp(5)
    },
    
    buttonStyle: {
        flex: 1,
        fontSize: dp(25),
        fontWeight: 'bold',
    },
 
    listStyle: {
        // margin: dp(5),
        overflowY: 'auto'
    },
    
    imgURL: 'url("images/hqdefault.jpg")'
};


export default class MyRecommendationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleToggle(event) {
        console.log("Toggled!");

        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }

    handleRequestClose() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.child}>
                    <div style={styles.msgStyle}>Experience our recommendation system.</div>
                    <div style={styles.barStyle}>
                        <div style={styles.buttonsBarStyle}>
                            <RaisedButton
                                style={styles.buttonStyle}
                                label="Click to add a category"
                                onTouchTap={this.handleToggle}
                                primary={true}
                            />
                            <Popover
                                open={this.state.open}
                                onRequestClose={this.handleRequestClose}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <Menu>
                                    <MenuItem value={1} primaryText="Recommended for you" />
                                    <MenuItem value={2} primaryText="Every Night" />
                                    <MenuItem value={3} primaryText="Weeknights" />
                                    <MenuItem value={4} primaryText="Weekends" />
                                    <MenuItem value={5} primaryText="Weekly" />
                                </Menu>
                            </Popover>
                            <RaisedButton 
                                label="Submit" 
                                style={styles.buttonStyle}
                                secondary={true}
                            />
                        </div>
                        <List style={styles.listStyle}>
                            <ListItem primaryText="Inbox" rightIcon={<ContentClear />} />
                            <ListItem primaryText="Starred" rightIcon={<ContentClear />} />
                            <ListItem primaryText="Sent mail" rightIcon={<ContentClear />} />
                            <ListItem primaryText="Sent mail" rightIcon={<ContentClear />} />
                        </List>
                    </div>
                </div>
            </div>
        );
    }




}

