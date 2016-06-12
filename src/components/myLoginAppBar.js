import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appTitle} from '../../strings/strings';
import FlatButton from 'material-ui/FlatButton';
import ActionZoomIn from 'material-ui/svg-icons/action/zoom-in';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import PlacesBeachAccess from 'material-ui/svg-icons/places/beach-access';
import {login, search} from '../../strings/strings';


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


export default class MyLoginAppBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    }

    handleLoginButtonClick() {
        this.props.handlers.handleLoginButtonClick();
    }

    render() {
        return (
            <AppBar
                style={styles.root}
                title={<span style={styles.titleStyle}>Title</span>}
                iconElementLeft={
                    <IconButton >
                        <PlacesBeachAccess />
                    </IconButton>
                }
                iconElementRight={
                    <div style={styles.rightStyle}>
                        <div style={styles.searchBarStyle}>
                            <TextField hintText={search} />
                            <IconButton>
                                <ActionZoomIn />
                            </IconButton>
                        </div>
                        <FlatButton
                            label="LOG IN"
                            labelStyle={styles.iconStyle}
                            onTouchTap={this.handleLoginButtonClick}
                        />
                    </div>
                }
            />
        );
    }
}

