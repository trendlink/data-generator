export function createTaxID() {
  let randomStr = getRandomInt(9999999).toString().padStart(7, '0');
  let result = getCksum(randomStr);
  console.log(`ID=${result}`);
  return result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getCksum(randomStr) {
  let sum = 0;
  let taxId = '';
  const cnum = randomStr.split('');
  const cx = [1, 2, 1, 2, 1, 2, 4, 1];

  for (let i = 0; i < cnum.length; i++) {
    let a = cnum[i];
    sum += cc(a * cx[i]);
  }

  if (sum % 10 === 0) {
    let endNumber = 0;
    taxId = `${randomStr}${endNumber}`;
    return taxId;
  } else if (cnum[6] === '7' && (sum + 1) % 10 === 0) {
    let endNumber = 10 - (sum % 10);
    taxId = `${randomStr}${endNumber}`;
  } else {
    let endNumber = 10 - (sum % 10);
    taxId = `${randomStr}${endNumber}`;
    return taxId;
  }
  return taxId;
}

function cc(num) {
  let total = num;
  if (total > 9) {
    let s = total.toString();
    const n1 = s.substring(0, 1) * 1;
    const n2 = s.substring(1, 2) * 1;
    total = n1 + n2;
    if (total > 9) {
      let s = total.toString();
      const n1 = s.substring(0, 1) * 1;
      const n2 = s.substring(1, 2);
      total = n1 + n2;
      if (total > 9) {
        let s = total.toString();
        const n1 = s.substring(0, 1) * 1;
        const n2 = s.substring(1, 2) * 1;
        total = n1 + n2;
      }
    }
  }

  return total;
}
