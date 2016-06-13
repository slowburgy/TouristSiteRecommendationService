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


class MySelectField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.category
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        this.state.value = value;
        this.props.handleChange(value);
        this.setState(this.state);
    }
    
    render() {
        var Field;
        
        switch (this.props.category) {
            case "M":
                Field = () => 
                    <SelectField
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={"m"} primaryText={"M"} />
                        <MenuItem value={"w"} primaryText={"W"} />
                    </SelectField>;
                break;
            
            case "Alone":
                Field = () =>
                    <SelectField
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={"alone"} primaryText={"alone"} />
                        <MenuItem value={"family"} primaryText={"with family"} />
                        <MenuItem value={"friends"} primaryText={"with friends"} />
                        <MenuItem value={"love"} primaryText={"with a lover"} />
                        <MenuItem value={"company"} primaryText={"with company members"} />
                    </SelectField>;
                break;
            default:
                console.error("Error");
        }
        
        
        return (
            <Field />
        );
    }
}


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
        this.handleTravelStyleChange = this.handleTravelStyleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.state.nickname = event.target.value;
    }

    handleAgeChange(event) {
        this.state.age = event.target.value;
    }

    handleGenderChange(value) {
        this.state.gender = value;
        console.log(value);
        // this.setState(this.state);
    }

    handleNatChange(event) {
        this.state.nationality = event.target.value;
    }

    handleTravelStyleChange(value) {
        this.state.travStyle = value;
    }
    
    handleSubmit() {
        this.props.handleSubmit(this.state);
    }
    
    render() {
        const actions = [
            this.handleNameChange,
            this.handleAgeChange,
            this.handleGenderChange,
            this.handleNatChange,
            this.handleTravelStyleChange
        ];

        const categories = [
            "Nickname",
            "Age",
            "Gender",
            "Nationality",
            "Travelling style"
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
                                            <MySelectField 
                                                category="M"
                                                handleChange={this.handleGenderChange}
                                            />;
                                        break;
                                    case "Travelling style":
                                        Entry = () =>
                                            <MySelectField
                                                category="Alone"
                                                handleChange={this.handleTravelStyleChange}
                                            />;
                                        break;
                                    default:
                                        Entry = () =>
                                            <TextField
                                                style={styles.fontStyle}
                                                onChange={actions[i]}
                                            />;
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