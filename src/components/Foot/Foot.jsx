import React from 'react'
import { injectIntl } from 'react-intl'
import { Layout } from 'antd';
import styles from './Foot.scss'

const { Footer } = Layout;

class Foot extends React.Component {

    render() {
        return (
            <Footer className={styles.wrapper}>
                    ©2019 Lenovo
            </Footer>
        )
    }
}

export default injectIntl(Foot)