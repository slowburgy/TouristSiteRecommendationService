import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import {dp, verticalDP} from '../../dimensions/dimensions';
import {_} from 'underscore';


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: verticalDP(30)
    },

    fillerStyle: {
        flex: 1
    },
    
    reviewStyle: {
        flex: 3, 
    },
    
    listStyle: {
    },
    
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
    },
    
    nameStyle: {
        flex: 1
    },
    
    starStyle: {
        flex: 1,
        alignSelf: 'flex-end'
    },
    
    oneStarStyle: {
        height: dp(20)
    }
};


export default class MyReviews extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={styles.root}>
                <div style={styles.fillerStyle}></div>
                <div style={styles.reviewStyle}>
                    <List style={styles.listStyle}>
                        {
                            this.props.reviews.map((item) => (
                                <div>
                                    <div style={styles.containerStyle}>
                                        <Subheader style={styles.nameStyle}>{item.date}</Subheader>
                                        <div style={styles.starStyle}>
                                            {
                                                _.range(item.starRating).map((e) =>
                                                    <ToggleStar style={styles.oneStarStyle}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <ListItem
                                        primaryText={item.name}
                                        secondaryText={item.content}
                                        secondaryTextLines={2}
                                        disabled={true}
                                    />
                                    <Divider />
                                </div>
                            ))
                        }
                    </List>
                </div>
                <div style={styles.fillerStyle}></div>
            </div>
        );
    }
}






















