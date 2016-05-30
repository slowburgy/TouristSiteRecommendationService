import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ProfileTableRow from './ProfileTableRow';

export default class MyProfilePage extends React.Component {
    constructor(props) {
        super(props);

        // Unused, just for reference.
        this.categories = [
            "Nickname",
            "Age",
            "Gender",
            "E-mail address",
            "Nationality"
        ];
    }

    render() {
        return (
            <div style={{display: 'inline-block', width: 1300}} >
                <Paper>
                    <Subheader>Profile Information</Subheader>
                    <Divider />
                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            <ProfileTableRow title={this.categories[0]} />
                            <ProfileTableRow title={this.categories[1]} />
                            <ProfileTableRow title={this.categories[2]} />
                            <ProfileTableRow title={this.categories[3]} />
                            <ProfileTableRow title={this.categories[4]} />
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}
