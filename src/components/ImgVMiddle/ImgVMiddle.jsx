import React from 'react'

import styles from './ImgVMiddle.scss'

function ImgVMiddle(props) {
  let { style, image, alt } = props
  return (
    <div className={styles.wrapper}>
      <img
        src={image}
        alt={alt}
        style={style}
      />
    </div>
  )
}

export default ImgVMiddle
