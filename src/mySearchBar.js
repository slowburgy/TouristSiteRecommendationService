import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

const style = {
    marginLeft: 500,
    marginRight: 500,
    marginTop: 30,
    marginBottom: 30,
    // display: 'inline-block'
};

const s = {
    width: 300,
};


export default class MySearchBar extends React.Component {
    render() {
        return (
            <Paper style={style} zDepth={0}>
                <TextField style={{width: 300, verticalAlign: 'middle', display: 'inline-block'}} hintText="Search for anything!" />
                <RaisedButton label="Search me!" style={{marginLeft: 20}}/>
            </Paper>
        );
    }








}

// <DropDownMenu style={s}>
//     <MenuItem value={1} primaryText="Never" />
//     <MenuItem value={2} primaryText="Every Night" />
//     <MenuItem value={3} primaryText="Weeknights" />
//     <MenuItem value={4} primaryText="Weekends" />
//     <MenuItem value={5} primaryText="Weekly" />
// </DropDownMenu>
// <RaisedButton label="Search!" />
