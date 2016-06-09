import React from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan50, grey200} from 'material-ui/styles/colors';
import {dp, horizontalDP, verticalDP} from '../dimensions/dimensions';
import DropDownMenu from 'material-ui/DropDownMenu'
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import {List, ListItem} from 'material-ui/List';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {appBarHeight} from '../dimensions/dimensions';


const styles = {
    root: {
        backgroundImage: 'url("images/hqdefault.jpg")',
        width: horizontalDP(1000),
        height: verticalDP(1000),
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    
    containerStyle: {
        marginTop: appBarHeight + dp(50),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.7,
        backgroundColor: grey200
    },

    msgStyle: {
        fontSize: dp(50),
        fontWeight: 'bold',
        textAlign: 'center',
        margin: dp(20),
    },

    buttonStyle: {
        margin: dp(20)
    },
    
    buttonTextStyle: {
    }
};


export default class MyLoginPage extends React.Component {
    render() {
        return (
            <div style={styles.root}>
                <div style={styles.containerStyle}>
                    <div style={styles.msgStyle}>
                        Login to experience our recommendation system
                    </div>
                    <RaisedButton
                        label="Login with Naver"
                        primary={true}
                        style={styles.buttonStyle}
                        labelStyle={styles.buttonTextStyle}
                    />
                </div>
            </div>
        );
    }
}



















