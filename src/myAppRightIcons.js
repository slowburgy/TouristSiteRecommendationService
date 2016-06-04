import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MySearchBar from './mySearchBar';

const styles = {
    root: {
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

    }
};

export default class MyAppRightIcons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleToggle = this.handleToggle.bind(this);

    }

    handleToggle() {
        console.log(this.state.open);
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div style={styles.root}>
                <MySearchBar />
                <FlatButton
                    label="LOGIN"
                    labelStyle={styles.iconStyle}
                />
                <FlatButton
                    label="MY PAGE"
                    labelStyle={styles.iconStyle}
                    onTouchTap={this.handleToggle}
                />
            </div>
        );
    }
}
