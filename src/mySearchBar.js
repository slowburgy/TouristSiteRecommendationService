import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import ActionZoomIn from 'material-ui/svg-icons/action/zoom-in';
import IconButton from 'material-ui/IconButton';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default class MySearchBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={styles.root}>
                <TextField hintText="Search for anything" />
                <IconButton>
                    <ActionZoomIn />
                </IconButton>
            </div>
        );
    }
}

