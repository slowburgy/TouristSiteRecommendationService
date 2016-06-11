import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {dp, verticalDP} from '../../dimensions/dimensions';
import {grey50} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles ={
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    filler: {
        flex: 1
    },
    
    child: {
        flex: 4,
        marginTop: verticalDP(50),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        backgroundColor: grey50,
        fontSize: dp(30),
        height: dp(80),
    },

    buttonBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: dp(20)
    },

    buttonStyle: {
        flex: 1,
        height: dp(60)
    },
    
    buttonLabelStyle: {
        fontSize: dp(25),
    },

    fontStyle: {
        fontSize: dp(20),
    }
};


export default class MyProfileEditPage extends React.Component {
    constructor(props) {
        super(props);

       
        this.state = {
            nickname: "",
            age: "",
            gender: "",
            nationality: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleNatChange = this.handleNatChange.bind(this);
        
        this.handleProfileEditSubmit = this.handleProfileEditSubmit.bind(this);
    }

    handleNameChange(event) {
        this.state.nickname = event.target.value;
    }

    handleAgeChange(event) {
        this.state.age = event.target.value;
    }

    handleGenderChange(event) {
        this.state.gender = event.target.value;
    }

    handleNatChange(event) {
        this.state.nationality = event.target.value;
    }
    
    handleProfileEditSubmit() {
        this.props.handlers.handleProfileEditSubmit(this.state);
        this.props.handlers.handleProfileEditSubmitRequest(this.state);
    }

    render() {
        const actions = [
            this.handleNameChange,
            this.handleAgeChange,
            this.handleGenderChange,
            this.handleNatChange
        ];

        const categories = [
            "Nickname",
            "Age",
            "Gender",
            "Nationality"
        ];

        const labels = [
            "nickname",
            "age",
            "gender",
            "nationality"
        ];
        
        return (
            <div style={styles.root}>
                <div style={styles.filler}></div>
                <Paper style={styles.child} zDepth={1}>
                    <Subheader style={styles.headerStyle}>Edit Profile Information</Subheader>
                    <Divider />
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                            {
                                categories.map((e, i) => (
                                    <TableRow>
                                        <TableRowColumn style={styles.fontStyle}>{e}</TableRowColumn>
                                        <TableRowColumn style={styles.fontStyle}>{this.props.userInfo[labels[i]]}</TableRowColumn>
                                        <TableRowColumn style={styles.fontStyle}>
                                            <TextField style={styles.fontStyle} onChange={actions[i]} />
                                        </TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div style={styles.buttonBarStyle}>
                        <RaisedButton
                            label="Submit changes"
                            style={styles.buttonStyle}
                            labelStyle={styles.buttonLabelStyle}
                            primary={true}
                            onTouchTap={this.handleProfileEditSubmit}
                        />
                    </div>
                </Paper>
                <div style={styles.filler}></div>
            </div>
        );
    }
}
