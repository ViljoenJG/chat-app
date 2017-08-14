const moment = require('moment');

let date = moment();
date.add(3, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY HH:mm:ss'))
console.log(date.format('h:mm a'))
