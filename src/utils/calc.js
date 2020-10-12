const getCol = (value) => {
  let row = 0;
  let count = 1;
  for (let i=value.length - 1; i >= 0; i--) {
    const ch = value[i];
    row += count * (ch.charCodeAt() - 'A'.charCodeAt());
    count = count * 10;
  }
  return row;
}

const getRow = (value) => {
  return parseInt(value, 10) - 1;
}

const parse = (value, values) => {
  if(value[0] >= 'A' && value[0] <= 'Z') {
    let leftFlag = false;
    let left = '';
    let right = '';
    for (let i=0; i<value.length; i++) {
      const ch = value[i];
      if(!leftFlag && ch >= 'A' && ch <= 'Z') {
        left += ch;
      } else if (ch >= '0' && ch <= '9') {
        if(!leftFlag) {
          leftFlag = true;
        }
        right += ch;
      } else {
        return 'INVALID';
      }
    }
    let str = 0;
    try {
      str = values[getRow(right)][getCol(left)];
    } catch(e) {
      str = 0;
    }
    if (typeof str === 'string' && str.startsWith('=')) {
      const strs = str.split('=');
      if(strs.length === 2 && strs[1]) {
        str = calc(strs[1], values);
      } else {
        return 'INVALID';
      }
    }
    return parseFloat(str);
  } else {
    return parseFloat(value);
  }
}

const calculation = (value, values, plus) => {
  let term = '';
  for(let i=0; i<value.length; i++) {
    const ch = value[i];
    if(ch === '+') {
      return parse(term.trim(), values) * (plus ? 1 : -1) + calculation(value.slice(i + 1), values, true);
    } else if(ch === '-') {
      return parse(term.trim(), values) * (plus ? 1 : -1) + calculation(value.slice(i + 1), values, false);
    } else {
      term += ch;
    }
  }
  return parse(term.trim(), values) * (plus ? 1 : -1);
}

const calc = (value, values) => {
  if(value) {
    return calculation(value, values, true);
  }
  return '';
}

export default calc;