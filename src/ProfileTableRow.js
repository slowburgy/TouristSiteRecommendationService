import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

export default class ProfileTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: "Default",
            textFieldValue: ""
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleOpen() {
        this.state.open = true;
        this.state.textFieldValue = "";
        this.setState(this.state);
    }

    handleClose() {
        this.state.open = false;
        this.state.textFieldValue = "";
        this.setState(this.state);
    }

    handleChange(e) {
        this.state.textFieldValue = e.target.value;
        this.setState(this.state);
    }

    handleSubmit() {
        this.state.open = false;
        this.state.value = this.state.textFieldValue;
        this.setState(this.state);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
            />
        ];

        return (
            <TableRow>
                <TableRowColumn>{this.props.title}</TableRowColumn>
                <TableRowColumn>{this.state.value}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="Edit"
                        onTouchTap={this.handleOpen}
                    />
                    <Dialog
                        title={this.props.title}
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <TextField
                            hintText="Press submit when done"
                            value={this.state.textFieldValue}
                            onChange={this.handleChange}
                        />
                    </Dialog>
                </TableRowColumn>
            </TableRow>
        );
    }
}









