import React from 'react';
import MyPageTab from './myPageTab';
import MyCategoryList from './myCategoryList';
import MyPlacePage from './myPlacePage';
import MyRecommendationBar from './myRecommendationBar';
import MyLoginPage from './myLoginPage';
import MyPageOnFirstLogin from './myPageOnFirstLogin';
import Paper from 'material-ui/Paper';
import {appBarHeight} from '../dimensions/dimensions';

export default class MyAppBody extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var BodyPage;
        var bodyPage = this.props.info.bodyPage;
        
        switch (bodyPage) {
            case "login page":
                console.log("myAppBody.login_page");
                BodyPage = () => (
                    <div>
                        <MyLoginPage />
                    </div>
                );
                break;
            
            case "page on first login":
                console.log("myAppBody.page_on_first_login");
                BodyPage = () => (
                    <div>
                        <div style={{height: appBarHeight}} ></div>
                        <MyPageOnFirstLogin 
                            info={this.props.info}
                            handlers={this.props.handlers}
                        />
                    </div>
                );
                break;

            case "main page":
                console.log("myAppBody.main_page");
                BodyPage = () => (
                    <div>
                        <MyRecommendationBar />
                        <MyCategoryList 
                            handlers={this.props.handlers}
                            info={this.props.info}
                        />
                    </div>
                );
                break;

            case "my page":
                BodyPage = () => (
                    <MyPageTab
                        handlers={this.props.handlers}
                        info={this.props.info}
                    />
                );
                break;

            case "place page":
                BodyPage = () => (
                    <div>
                        <MyPlacePage 
                            handlers={this.props.handlers}
                            info={this.props.info}
                        />
                    </div>
                );
                break;

            default:
                console.log("Invalid bodyPage value.");
        }

        return <BodyPage />;
    }
}







