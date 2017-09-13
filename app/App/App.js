import React from 'react';
import PropTypes from 'prop-types';

require('./App.scss');

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Привет Мир Я маленькое react приложение =)</div>
        );
    }
}

App.propTypes = {};

export default App;
