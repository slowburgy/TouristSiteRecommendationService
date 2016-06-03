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

// <DropDownMenu style={s}>
//     <MenuItem value={1} primaryText="Never" />
//     <MenuItem value={2} primaryText="Every Night" />
//     <MenuItem value={3} primaryText="Weeknights" />
//     <MenuItem value={4} primaryText="Weekends" />
//     <MenuItem value={5} primaryText="Weekly" />
// </DropDownMenu>
// <RaisedButton label="Search!" />

export default class MySearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.styles = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }
        };
    }

    render() {
        return (
            <div style={this.styles.root}>
                <TextField hintText="Search for anything" />
                <IconButton>
                    <ActionZoomIn />
                </IconButton>
            </div>
        );
    }
}

