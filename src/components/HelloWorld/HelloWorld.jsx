import React from 'react';
import styles from './HelloWorld.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
      }

    render() {
        return <div className={styles.fontC}>Hello World !</div>;
    }
}

export default App;