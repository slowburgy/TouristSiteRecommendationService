import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appTitle} from '../../strings/strings';
import FlatButton from 'material-ui/FlatButton';
import ActionZoomIn from 'material-ui/svg-icons/action/zoom-in';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import PlacesBeachAccess from 'material-ui/svg-icons/places/beach-access';
import {logout, mypage} from '../../strings/strings';


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
        
        this.handleMainPageButtonClick = this.handleMainPageButtonClick.bind(this);
        this.changeAppLanguage = this.changeAppLanguage.bind(this);
        this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
        this.handleMyPageButtonClick = this.handleMyPageButtonClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    changeAppLanguage() {
        this.props.handlers.changeAppLanguage();
    }

    handleMyPageButtonClick() {
        window.location.href = "../../my_page.html";
    }

    handleLogoutButtonClick() {
        window.sessionStorage.clear();
        window.location.href = "../../index.html";
    }

    handleBackButtonClick() {
        this.props.handlers.handleBackButtonClick();
    }
    
    handleMainPageButtonClick() {
        window.location.href = "../../main.html";
    }

    render() {
        var strings = this.props.info.strings;
        
        return (
            <AppBar
                style={styles.root}
                title={<span style={styles.titleStyle}>{strings.appTitle}</span>}
                onTitleTouchTap={this.handleMainPageButtonClick}
                iconElementLeft={
                    <IconButton onTouchTap={this.handleMainPageButtonClick}>
                        <PlacesBeachAccess />
                    </IconButton>
                }
                iconElementRight={
                    <div style={styles.rightStyle}>
                        <div style={styles.searchBarStyle}>
                            <TextField hintText={strings.search} />
                            <IconButton>
                                <ActionZoomIn />
                            </IconButton>
                        </div>
                        <FlatButton
                            label={strings.language}
                            labelStyle={styles.iconStyle}
                            onTouchTap={this.changeAppLanguage}
                        />
                        <FlatButton
                            label={strings.mypage}
                            labelStyle={styles.iconStyle}
                            onTouchTap={this.handleMyPageButtonClick}
                        />
                        <FlatButton
                            label={strings.logout}
                            labelStyle={styles.iconStyle}
                            onTouchTap={this.handleLogoutButtonClick}
                        />
                    </div>
                }
            />
        );
    }
}

