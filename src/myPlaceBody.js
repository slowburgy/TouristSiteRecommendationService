import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import {_} from 'underscore';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {horizontalDP, verticalDP, dp, placePageTab, appBarHeight} from '../dimensions/dimensions';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


var styles = {
    root: {
        width: horizontalDP(1000) - placePageTab,
        height: verticalDP(1000) - appBarHeight,
        backgroundSize: 'cover', 
        marginTop: appBarHeight,
        marginLeft: placePageTab,
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'row'
    },

    reviewFormStyle: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center'
    },

    reviewTextFieldStyle: {
        flex: 1,
        marginLeft: dp(15),
        marginBottom: dp(10)
    },
    
    starSubmitStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dp(70)
    },

    starRatingStyle: {
        marginLeft: dp(15),
        marginRight: dp(15),
        width: dp(200)
    },
    
    submitButtonStyle: {
        marginLeft: dp(15),
        marginRight: dp(15),
    },

    reviewStyle: {
        flex: 1, 
    },
    
    listStyle: {
        marginLeft: dp(15),
        marginRight: dp(15),
        marginTop: dp(10),
        overflowY: true
    },
    
    navigationButtonStyle: {
        marginLeft: dp(15),
        marginRight: dp(15),
        marginTop: dp(10)
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


export default class MyPlaceBody extends React.Component {
    constructor(props) {
        super(props);

        var reviews = this.props.info.place.reviews;

        this.state = {
            value: 3,
            currentReview: "",
            reviews: reviews
        };

        this.handleShowImagePage = this.handleShowImagePage.bind(this);
        this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleSelectFieldChange(evt, index, value) {
        this.state.value = value;
        this.setState(this.state);
    }
    
    handleShowImagePage() {
        this.props.handlers.handleShowImagePage();
    }
    
    handleReviewSubmit() {
        var today = new Date();
        var date = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();

        var placeReview = {
            name: this.props.info.user.nickname,
            starRating: this.state.value,
            date: date,
            content: this.state.currentReview
        };

        var userReview = {
            name: this.props.info.place.name,
            starRating: this.state.value,
            date: date,
            content: this.state.currentReview
        };

        /*
         TODO: Routine for updating place_reviews and my_reviews in the server goes here.
         */
        
        this.props.handlers.handleReviewSubmit(placeReview, userReview);
        this.state.currentReview = "";
        this.setState(this.state);
    }

    handleTextFieldChange(evt) {
        this.state.currentReview = evt.target.value;
    }
    
    render() {
        var Reviews;
        var rootStyle = styles.root;
        
        if (this.props.reviewFlag) {
            if (rootStyle.backgroundImage) { 
                rootStyle.backgroundImage = null;
            }
            
            Reviews = () => (
                <div style={styles.reviewStyle}>
                    <IconButton style={styles.navigationButtonStyle} onTouchTap={this.handleShowImagePage}>
                        <NavigationArrowBack />
                    </IconButton>
                    <List style={styles.listStyle}>
                        <div style={styles.reviewFormStyle}>
                            <TextField 
                                style={styles.reviewTextFieldStyle} 
                                multiLine={true}
                                hintText="Write a review"
                                onChange={this.handleTextFieldChange}
                            />
                        </div>
                        <div style={styles.starSubmitStyle}>
                            <SelectField 
                                value={this.state.value} 
                                onChange={this.handleSelectFieldChange} 
                                style={styles.starRatingStyle}
                                floatingLabelText="Rate this place"
                            >
                                <MenuItem value={1} primaryText="1" />
                                <MenuItem value={2} primaryText="2" />
                                <MenuItem value={3} primaryText="3" />
                                <MenuItem value={4} primaryText="4" />
                                <MenuItem value={5} primaryText="5" />
                            </SelectField>
                            <RaisedButton
                                primary={true}
                                label="Submit"
                                style={styles.submitButtonStyle}
                                onTouchTap={this.handleReviewSubmit}
                            />
                        </div>
                        <Divider />
                        {
                            this.state.reviews.map((item) => (
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
            );
        } else {
            rootStyle.backgroundImage = this.props.imgURL;
            Reviews = () => (<div></div>);
        }
        
        return (
            <div style={rootStyle}>
                <Reviews />
            </div>
        );
    }
}
