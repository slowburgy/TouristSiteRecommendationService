import React from 'react';
import MyPlaceBody from './myPlaceBody';
import MyPlacePageTab from './myPlacePageTab';


var styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
};


export default class MyPlacePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            reviewFlag: false
        };
        this.handleShowReviewPage = this.handleShowReviewPage.bind(this);
        this.handleShowImagePage = this.handleShowImagePage.bind(this);
    }
    
    handleShowReviewPage() {
        this.setState({reviewFlag: true});
    }

    handleShowImagePage() {
        this.setState({reviewFlag: false});
    }
    
    render() {
        var tabHandlers = this.props.handlers;
        tabHandlers.handleShowReviewPage = this.handleShowReviewPage;

        var bodyHandlers = this.props.handlers;
        bodyHandlers.handleShowImagePage = this.handleShowImagePage;
        
        var imgURL = 'url("' + this.props.info.place.img + '")';

        return (
            <div style={styles.root}>
                <MyPlacePageTab 
                    handlers={tabHandlers}
                    info={this.props.info}
                />
                <MyPlaceBody
                    info={this.props.info}
                    imgURL={imgURL}
                    handlers={bodyHandlers}
                    reviewFlag={this.state.reviewFlag}
                />
            </div>
        );
    }
}







