import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

const style = {
    marginLeft: 200,
    marginRight: 200,
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column'
    // display: 'inline-block'
};

const s = {
    width: 300,
};

// <Paper style={style} zDepth={1}>
//     <div style={{display: 'flex', flexDirection: 'row'}}>
//         <TextField style={{flex: 1}} hintText="Search for anything!" />
//         <SelectField style={{flex: 2}}>
//             <MenuItem value={1} primaryText="Never" />
//             <MenuItem value={2} primaryText="Every Night" />
//             <MenuItem value={3} primaryText="Weeknights" />
//             <MenuItem value={4} primaryText="Weekends" />
//             <MenuItem value={5} primaryText="Weekly" />
//         </SelectField>
//     </div>
//     <RaisedButton label="Search me!" />
// </Paper>

// <TextField style={{display: 'flex'}} hintText="Search for anything!" />
// <RaisedButton label="Search me!" style={{flex: 1}} />

export default class MySearchBar extends React.Component {
    render() {
        return (
            <div></div>

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
