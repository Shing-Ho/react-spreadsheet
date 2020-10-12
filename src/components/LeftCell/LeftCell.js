import React from 'react';
import styles from './LeftCell.module.scss'

const LeftCell = ({cell}) => {
  return (
    <div className={styles.main}>
      <span className={styles.value}>{cell}</span>
    </div>
  )
}

export default LeftCell;