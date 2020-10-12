import React, {useState} from 'react';

import styles from './Cell.module.scss'

const Cell = ({value, getCalcValue, setValue}) => {
  const [enableEditing, setEnableEditing] = useState(false);

  const onBlur = () => {
    setEnableEditing(false);
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      setEnableEditing(false);
    }
  }

  return (
    <div className={styles.main} onDoubleClick={() => setEnableEditing(true)}>
      {!enableEditing ? (
        <span className={styles.value}>{getCalcValue(value)}</span>
      ) : (
        <input
          type="text"
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => onBlur()}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  )
}

export default Cell;