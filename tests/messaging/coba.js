const today = Date.now()
const yesterday = today - 86400000


console.log(new Date(today).toISOString())
console.log(new Date(yesterday))