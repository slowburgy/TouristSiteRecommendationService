import React from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan50} from 'material-ui/styles/colors';

export default class MyRecommendationBar extends React.Component {
    constructor(props) {
        super(props);

        this.imgURL = 'url("images/hqdefault.jpg")';
        this.styles = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: 0.5 * window.innerHeight, 
                backgroundImage: 'url("images/hqdefault.jpg")'
            },
            
            child: {
                flex: 0.8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                height: 0.38 * window.innerHeight
            },

            msgStyle: {
                fontSize: 40,
                textAlign: 'center',
                marginBottom: 15
            },
            
            barStyle: {
                margin: 10,
                backgroundColor: cyan50,
                opacity: 0.9
            },

            barHeadStyle: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 15
            },
            
            selectFieldStyle: {
                margin: 10
            },
            
            checkboxStyle: {
                margin: 10
            },

            buttonStyle: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }
        }
    }

    render() {
        return (
            <div style={this.styles.root}>
                <div style={this.styles.child}>
                    <div style={this.styles.msgStyle}>Experience our world-best recommendation system.</div>
                    <Paper style={this.styles.barStyle}>
                        <div style={this.styles.barHeadStyle}>
                            <div>Choose your category: </div>
                            <SelectField value={1} autowidth={true} style={this.styles.selectFieldStyle}>
                                <MenuItem value={1} primaryText="Recommended for you" />
                                <MenuItem value={2} primaryText="Every Night" />
                                <MenuItem value={3} primaryText="Weeknights" />
                                <MenuItem value={4} primaryText="Weekends" />
                                <MenuItem value={5} primaryText="Weekly" />
                            </SelectField>
                        </div>
                        <div style={this.styles.checkboxStyle}>
                            <Checkbox
                                label="Recommended for women"
                                defaultChecked={true}
                            />
                            <Checkbox
                                label="Recommended for alone"
                                defaultChecked={true}
                            />
                        </div>
                        <div style={this.styles.buttonStyle}><RaisedButton label="Submit" /></div>
                    </Paper>
                </div>
            </div>
        );
    }




}

