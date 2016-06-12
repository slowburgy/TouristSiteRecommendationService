import React from 'react';
import MyCategoryList from './myCategoryList';
import MyPlacePage from './myPlacePage';
import MyRecommendationBar from './myRecommendationBar';
import MyPageTab from './myPageTab';

export default class MyAppBody extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var BodyPage;
        var bodyPage = this.props.info.bodyPage;
        
        switch (bodyPage) {
            case "main page":
                console.log("myAppBody.main_page");
                BodyPage = () => (
                    <div>
                        <MyRecommendationBar 
                            handlers={this.props.handlers}
                        />
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
                console.log("Invalid bodyPage type with: " + bodyPage);
        }

        return <BodyPage />;
    }
}







