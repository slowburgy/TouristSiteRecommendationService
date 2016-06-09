import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {dp, verticalDP, horizontalDP} from '../dimensions/dimensions';
import {grey50} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

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
        flex: 2,
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
        height: dp(80)
    },
    
    buttonLabelStyle: {
        fontSize: dp(30),
    },
    
    fontStyle: {
        fontSize: dp(25)
    }
};


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
        
        this.info = [
            "jjsohn",
            "25",
            "Female",
            "kasio555@gmail.com",
            "Korea, Republic Of"
        ];
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.filler}></div>
                <Paper style={styles.child} zDepth={1}>
                    <Subheader style={styles.headerStyle}>Profile Information</Subheader>
                    <Divider />
                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.categories.map((e, i) => (
                                    <TableRow>
                                        <TableRowColumn style={styles.fontStyle}>{e}</TableRowColumn>
                                        <TableRowColumn style={styles.fontStyle}>{this.info[i]}</TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div style={styles.buttonBarStyle}>
                        <RaisedButton
                            label="Edit profile information"
                            style={styles.buttonStyle}
                            labelStyle={styles.buttonLabelStyle}
                            secondary={true}
                        />
                    </div>
                </Paper>
                <div style={styles.filler}></div>
            </div>
        );
    }
}
