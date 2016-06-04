import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {dp, verticalDP, horizontalDP} from '../dimensions/dimensions';
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
        fontWeight: 'bold',
        backgroundColor: grey50,
        fontSize: dp(40),
        height: dp(100)
    },

    buttonBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: dp(20)
    },

    buttonStyle: {
        flex: 1,
        height: dp(80)
    },
    
    buttonLabelStyle: {
        fontSize: dp(30),
    },

    fontStyle: {
        fontSize: dp(25)
    }
};


export default class MyProfileEditPage extends React.Component {
    constructor(props) {
        super(props);

        this.categories = [
            "Nickname",
            "Age",
            "Gender",
            "E-mail address",
            "Nationality"
        ];
        
        this.info = [
            "jjsohn",
            "25",
            "Female",
            "kasio555@gmail.com",
            "Korea, Republic Of"
        ];

        this.state = {
            "nameVal": "",
            "ageVal": "",
            "genderVal": "",
            "emailVal": "",
            "natVal": ""
        };

        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNatChange = this.handleNatChange.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            "nameVal": event.target.value,
            "ageVal": this.state.ageVal,
            "genderVal": this.state.genderVal,
            "emailVal": this.state.emailVal,
            "natVal": this.state.natVal
        })
    }

    handleAgeChange(event) {
        this.setState({
            "nameVal": this.state.nameVal,
            "ageVal": event.target.value,
            "genderVal": this.state.genderVal,
            "emailVal": this.state.emailVal,
            "natVal": this.state.natVal
        })
    }

    handleGenderChange(event) {
        this.setState({
            "nameVal": this.state.nameVal,
            "ageVal": this.state.ageVal,
            "genderVal": event.target.value,
            "emailVal": this.state.emailVal,
            "natVal": this.state.natVal
        })
    }

    handleEmailChange(event) {
        this.setState({
            "nameVal": this.state.nameVal,
            "ageVal": this.state.ageVal,
            "genderVal": this.state.genderVal,
            "emailVal": event.target.value,
            "natVal": this.state.natVal
        })
    }

    handleNatChange(event) {
        this.setState({
            "nameVal": this.state.nameVal,
            "ageVal": this.state.ageVal,
            "genderVal": this.state.genderVal,
            "emailVal": this.state.emailVal,
            "natVal": event.target.value
        })
    }
    
    handleSubmit() {
        console.log(this.state);
    }

    render() {
        const actions = [
            this.handleNameChange,
            this.handleAgeChange,
            this.handleGenderChange,
            this.handleEmailChange,
            this.handleNatChange
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
                                this.categories.map((e, i) => (
                                    <TableRow>
                                        <TableRowColumn style={styles.fontStyle}>{e}</TableRowColumn>
                                        <TableRowColumn style={styles.fontStyle}>{this.info[i]}</TableRowColumn>
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
                            onTouchTap={this.handleSubmit}
                        />
                    </div>
                </Paper>
                <div style={styles.filler}></div>
            </div>
        );
    }
}
