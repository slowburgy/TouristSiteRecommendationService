import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appTitle} from '../strings/strings';
import FlatButton from 'material-ui/FlatButton';
import ActionZoomIn from 'material-ui/svg-icons/action/zoom-in';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import PlacesBeachAccess from 'material-ui/svg-icons/places/beach-access';


const styles = {
    root: {
        position: 'fixed',
        opacity: 0.65
    },

    titleStyle: {
        cursor: 'pointer'
    },

    rightStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconStyle: {
        color: 'white',
        fontWeight: 'bold'
    },

    searchBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
};


export default class MyAppBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.handleMyPageButtonClick = this.handleMyPageButtonClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleLoginButtonClick() {
        this.props.handlers.handleLoginButtonClick();
    }

    handleMyPageButtonClick() {
        this.props.handlers.handleMyPageButtonClick();
    }

    handleBackButtonClick() {
        this.props.handlers.handleBackButtonClick();
    }

    render() {
        var PageButton;
        var bodyPage = this.props.info.bodyPage;

        switch (bodyPage) {
            case "login page":
                console.log("myAppBar.login_page");
                PageButton = () => (
                    <FlatButton
                        label="LOGIN"
                        labelStyle={styles.iconStyle}
                        onTouchTap={this.handleLoginButtonClick}
                    />
                );
                break;

            default:
                console.log("myAppBar.my_page");
                PageButton = () => (
                    <FlatButton
                        label="MY PAGE"
                        labelStyle={styles.iconStyle}
                        onTouchTap={this.handleMyPageButtonClick}
                    />
                );
        }

        return (
            <AppBar
                style={styles.root}
                title={<span style={styles.titleStyle}>{appTitle}</span>}
                onTitleTouchTap={this.handleBackButtonClick}
                iconElementLeft={
                    <IconButton onTouchTap={this.handleBackButtonClick}>
                        <PlacesBeachAccess />
                    </IconButton>
                }
                iconElementRight={
                    <div style={styles.rightStyle}>
                        <div style={styles.searchBarStyle}>
                            <TextField hintText="Search for anything" />
                            <IconButton>
                                <ActionZoomIn />
                            </IconButton>
                        </div>
                        <PageButton />
                    </div>
                }
            />
        );
    }
}

