import React from 'react';
import styles from './HeaderCell.module.scss'

const HeaderCell = ({cell}) => {
  return (
    <div className={styles.main}>
      <span className={styles.value}>{cell}</span>
    </div>
  )
}

export default HeaderCell;