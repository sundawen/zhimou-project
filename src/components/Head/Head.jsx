import React from 'react'
import { injectIntl } from 'react-intl'
import {Layout} from 'antd';
import styles from './Head.scss'

const {Header} = Layout;

class Head extends React.Component {

    render() {
        return (
            <Header className={styles.wrapper} />
        )
    }
}

export default injectIntl(Head)