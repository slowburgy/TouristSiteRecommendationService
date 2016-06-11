import React from 'react';
import MySiteList from './mySiteList';
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















