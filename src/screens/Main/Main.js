import React, {useState} from 'react';
import Cell from '../../components/Cell';
import HeaderCell from '../../components/HeaderCell';
import LeftCell from '../../components/LeftCell';
import { calc } from '../../utils';
import styles from './Main.module.scss';

const rowCount = 100;
const colCount = 26;

export default function Main() {
  const [values, setValues] = useState(null);

  const handleChangeValue = (row, col, value) => {
    setValues((val) => {
      if(!val) {
        val = new Array(rowCount);
        val[row] = new Array(colCount).fill('');
      } else {
        if(!val[row] || !Array.isArray(val[row])) {
          val[row] = new Array(colCount).fill('');
        }
      }
      val[row][col] = value;
      return [...val];
    });
  }

  const getValue = (row, col) => {
    let value = '';
    if(!values) {
      return ''
    } else {
      value =  values[row] ? values[row][col] || '' : ''
    }
    return value;
  }

  const getCalcValue = (value) => {
    if (value.startsWith('=')) {
      const strs = value.split('=');
      if(strs.length === 2 && strs[1]) {
        value = calc(strs[1], values);
      }
    }
    return value;
  }

  return (
    <div className={styles.body}>
      <div className={styles.left}>
        {
          new Array(rowCount).fill(0).map((_, index) => {
            return (
              <LeftCell key={index} cell={index + 1} />
            )
          })
        }
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          {
            new Array(colCount).fill(0).map((_, index) => {
              return (
                <HeaderCell key={index} cell={String.fromCharCode('A'.charCodeAt() + index)} />
              )
            })
          }
        </div>
        <div className={styles.main}>
          {
            new Array(rowCount).fill(0).map((_, row) => {
              return (
                <div key={'row'+row} className={styles.top}>
                  {
                    new Array(colCount).fill(0).map((_, col) => {
                      return (
                        <Cell
                          key={'cell' + row + col}
                          getCalcValue={(value) => getCalcValue(value)}
                          value={getValue(row, col)}
                          setValue={(value) => handleChangeValue(row , col , value)} />
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}