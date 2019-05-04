import React from 'react'
import { injectIntl } from 'react-intl'
import QueueAnim from 'rc-queue-anim'
import classNames from 'classnames'
import styles from './LeftBar.scss'

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const leftList = this.props.leftList
    return (
      <div className={styles.leftSideBar}>
        <QueueAnim
          delay={400}
          duration={800}
          type="left"
        >
          {
            leftList &&
            Object.keys(leftList).map((item, index) => {
              return (
                <div className={styles.tabWrapper} key={item + index}>
                  <ul>
                    <li
                      className={classNames({
                        [styles.level1]: true,
                        [styles.level1Active]: this.props.level1Active === item,
                      })}
                      data-value={item}
                      title={item}
                    >
                      {item}
                    </li>
                  </ul>
                </div>
              )
            })
          }
        </QueueAnim>
      </div>
    )
  }
}

export default injectIntl(LeftBar)