import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan50, grey200} from 'material-ui/styles/colors';
import {dp, horizontalDP, verticalDP} from '../../dimensions/dimensions';
import {appBarHeight} from '../../dimensions/dimensions';
import {stringEn} from '../../strings/strings';


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
        // opacity: 0.7,
        // backgroundColor: grey200
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
    constructor(props){
	super(props);
	this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    }

    handleLoginButtonClick() {
	this.props.handlers.handleLoginButtonClick();
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.containerStyle}>
                    <div style={styles.msgStyle}>
                        {stringEn.greetings}
                    </div>
                    <RaisedButton
                        label="Login with Facebook"
                        secondary={true}
                        style={styles.buttonStyle}
                        labelStyle={styles.buttonTextStyle}
			onTouchTap={this.handleLoginButtonClick}
                    />
                </div>
            </div>
        );
    }
}



















