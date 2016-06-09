import React from 'react';
import Paper from 'material-ui/Paper';
import MySiteList from './mySiteList';
import Subheader from 'material-ui/Subheader';
import {cyan50} from 'material-ui/styles/colors';
import {verticalDP} from '../dimensions/dimensions';

const styles = {
    siteListStyle: {
        margin: verticalDP(20),
    },
};


export default class MyCategoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div  >
                {data.map((d) => (
                    <div style={styles.siteListStyle}>
                        <MySiteList 
                            data={d} 
                            handlers={this.props.handlers}
                            info={this.props.info}
                        />
                    </div>
                ))}
            </div>
        );
    }
}















