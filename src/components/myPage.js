import React from 'react';
import MyProfilePage from './myProfilePage';
import MyProfileEditPage from './myProfileEditPage';
import MyLikedPlaces from './myLikedPlaces';
import MyReviews from './myReviews';

export default class MyPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            profileEdit: false,
            info: this.props.info
        };
        
        this.handleProfileEditRequest = this.handleProfileEditRequest.bind(this);
        this.handleProfileEditSubmitRequest = this.handleProfileEditSubmitRequest.bind(this);
    }
    
    handleProfileEditRequest() {
        this.state.profileEdit = true;
        this.setState(this.state);
    }
    
    handleProfileEditSubmitRequest(profileInfo) {
        this.state.profileEdit = false;
        this.setState(this.state);
    }
    
    render() {
        var Page;
        
        switch (this.props.myPage) {
            case "profile":
                var bodyHandlers = this.props.handlers;
                bodyHandlers.handleProfileEditRequest = this.handleProfileEditRequest;
                bodyHandlers.handleProfileEditSubmitRequest = this.handleProfileEditSubmitRequest;
                
                var userInfo = {
                    nickname: this.state.info.user.nickname,
                    age: this.state.info.user.age,
                    gender: this.state.info.user.gender,
                    nationality: this.state.info.user.nationality
                };
                
                if (!this.state.profileEdit) {
                    Page = () =>
                        <MyProfilePage
                            userInfo={userInfo}
                            handlers={bodyHandlers}
                        />;
                } else {
                    Page = () =>
                        <MyProfileEditPage
                            userInfo={userInfo}
                            handlers={bodyHandlers}
                        />;
                }
                break;
            
            case "liked places":
                Page = () => (
                    <MyLikedPlaces 
                        info={this.state.info}
                        handlers={this.props.handlers}
                    />
                );
                break;
            
            case "reviews":
                Page = () => (
                    <MyReviews 
                        reviews={this.state.info.user.reviews}
                        handlers={this.props.handlers}
                    />
                );
                break;
            
            default:
                console.log("My Page not rendered.");
        }
   
        return <Page />;
    }
    
    
    
    
}