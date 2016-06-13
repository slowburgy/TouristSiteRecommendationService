import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {dp, verticalDP} from '../../dimensions/dimensions';
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
        height: dp(65)
    },
    
    buttonLabelStyle: {
        fontSize: dp(25),
    },
    
    fontStyle: {
        fontSize: dp(25)
    }
};


export default class MyProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleProfileEditRequest = this.handleProfileEditRequest.bind(this);
    }
    
    handleProfileEditRequest() {
        this.props.handlers.handleProfileEditRequest();
    }
    
    render() {
        var strings = this.props.info.strings;
        
        var categories = [
            strings.nickname,
            strings.age,
            strings.gender,
            strings.nationality
        ];
        
        var labels = [
            "nickname",
            "age",
            "gender",
            "nationality"
        ];
        
        return (
            <div style={styles.root}>
                <div style={styles.filler}></div>
                <Paper style={styles.child} zDepth={1}>
                    <Subheader style={styles.headerStyle}>Profile Information</Subheader>
                    <Divider />
                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            {
                                categories.map((e, i) => (
                                    <TableRow>
                                        <TableRowColumn style={styles.fontStyle}>{e}</TableRowColumn>
                                        <TableRowColumn style={styles.fontStyle}>{this.props.userInfo[labels[i]]}</TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div style={styles.buttonBarStyle}>
                        <RaisedButton
                            label={strings.editProfile}
                            style={styles.buttonStyle}
                            labelStyle={styles.buttonLabelStyle}
                            secondary={true}
                            onTouchTap={this.handleProfileEditRequest}
                        />
                    </div>
                </Paper>
                <div style={styles.filler}></div>
            </div>
        );
    }
}
