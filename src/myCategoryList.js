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
        
        console.log("myCategoryList.constructor");
    }

    render() {
        console.log("myCategoryList.render");
        
        const categories = this.props.info.user.recommendations;
        const likedPlaces = this.props.info.user.likedPlaces;
        
        return (
            <div  >
                {categories.map((cat) => (
                    <div style={styles.siteListStyle}>
                        <MySiteList 
                            recommendations={cat}
                            likedPlaces={likedPlaces}
                            handlers={this.props.handlers}
                        />
                    </div>
                ))}
            </div>
        );
    }
}















