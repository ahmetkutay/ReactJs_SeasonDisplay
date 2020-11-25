import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { lat: null, long: null, errorMessage: '' };

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


    render() {
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
            return (
                <div>
                    <h1>
                        Latidude: {this.state.lat}
                    </h1>
                    <h1>
                        Longitude: {this.state.long}
                    </h1>
                </div>
            );
        }

        return (
            <div><h1>Loading!</h1></div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);