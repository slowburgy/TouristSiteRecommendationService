import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appTitle} from '../strings/strings';
import MyAppRightIcons from './myAppRightIcons';
import MyMainPageTab from './myMainPageTab';
import FlatButton from 'material-ui/FlatButton';
import ActionZoomIn from 'material-ui/svg-icons/action/zoom-in';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';


const styles = {
    root: {
        position: 'fixed',
        opacity: 0.65
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
    }

    handleLoginButtonClick() {
        this.props.handlers.handleLoginButtonClick();
    }

    handleMyPageButtonClick() {
        this.props.handlers.handleMyPageButtonClick();
    }

    render() {
        var PageButton;

        var bodyPage = this.props.info.bodyPage;

        switch (bodyPage) {
    
            case "login page":
                PageButton = () => (
                    <FlatButton
                        label="LOGIN"
                        labelStyle={styles.iconStyle}
                        onTouchTap={this.handleLoginButtonClick}
                    />
                );
                break;

            case "my page":
                PageButton = () => (
                    <FlatButton
                        label="MY PAGE"
                        labelStyle={styles.iconStyle}
                        onTouchTap={this.handleMyPageButtonClick}
                    />
                );
                break;
            
            default:
                
        }

        return (
            <AppBar style={styles.root}
                title={appTitle}
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

