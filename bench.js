const bench = require('nanobench')
const { length } = require('.')

bench('calculate length of range', (b) => {
  b.start()
  const size = length('1-1_000_000_000'.replace(/_/g, ''))
  console.log(size)
  b.end()
})  
