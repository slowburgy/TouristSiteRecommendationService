import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {dp, horizontalDP, appBarHeight} from '../../dimensions/dimensions';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
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
};


export default class MyFirstProfile extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            nickname: "",
            age: "",
            gender: "",
            nationality: "",
            travStyle: ""
        };
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleNatChange = this.handleNatChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.state.nickname = event.target.value;
    }

    handleAgeChange(event) {
        this.state.age = event.target.value;
    }

    handleGenderChange(event, index, value) {
        this.state.gender = value;
        this.setState(this.state);
    }

    handleNatChange(event) {
        this.state.nationality = event.target.value;
    }
    
    handleSubmit() {
        this.props.handleSubmit(this.state);
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

        return (
            <Paper>
                <Divider />
                <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        {
                            categories.map(function(e, i) {
                                var Entry;

                                switch (e) {
                                    case "Gender":
                                        Entry = () =>
                                            <SelectField
                                                value={this.state.gender}
                                                onChange={actions[i]}
                                            >
                                                <MenuItem value={"M"} primaryText={"M"} />
                                                <MenuItem value={"W"} primaryText={"W"} />
                                            </SelectField>;
                                        break;
                                    case "Travelling style":

                                        break;
                                    default:
                                        Entry = () =>
                                            <TextField
                                                value={this.state[e.toLowerCase()]}
                                                style={styles.fontStyle}
                                                onChange={actions[i]}/>;
                                }

                                return (
                                    <TableRow>
                                        <TableRowColumn style={styles.fontStyle}>{e}</TableRowColumn>
                                        <TableRowColumn style={styles.fontStyle}>
                                            <Entry />
                                        </TableRowColumn>
                                    </TableRow>
                                );
                            }.bind(this))
                        }
                    </TableBody>
                </Table>
                <div style={styles.buttonBarStyle}>
                    <RaisedButton
                        label="Submit"
                        style={styles.buttonStyle}
                        labelStyle={styles.buttonLabelStyle}
                        primary={true}
                        onTouchTap={this.handleSubmit}
                    />
                </div>
            </Paper>
            
        );
    }
    
    
    
    
    
}