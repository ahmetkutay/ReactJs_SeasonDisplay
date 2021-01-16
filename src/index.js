import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import "semantic-ui-css/semantic.min.css";
import Spinner from './spinner';

class App extends React.Component {

    state = { lat: null, long: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ lat: position.coords.latitude });
                this.setState({ long: position.coords.longitude });
            },
            err => {
                this.setState({
                    errorMessage: err.message
                });
            }
        );
    }

    componentDidUpdate() {
        console.log('My component was just updated and it rerendered.');
    }

    renderContent(){
        if (this.state.errorMessage && !(this.state.lat && this.state.long)) {
            return (
                <div>
                    <h1>
                        Error: {this.state.errorMessage}
                    </h1>
                </div>
            );
        }

        if (!this.state.errorMessage && (this.state.lat && this.state.long)) {
            return <SeasonDisplay lat={this.state.lat} long={this.state.long} />
        }

        return <Spinner message="Please accept location request" />;
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);