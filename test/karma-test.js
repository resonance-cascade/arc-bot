var test = require('tape')

var karmaGetter = require('../lib/karma').karmaGetter

var strings = [
  {
    input: 'bloopy++',
    expected: 'bloopy'
  },
  {
    input: 'smoopy boopy++',
    expected: 'boopy'
  },
  {
    input: 'arc-bot++',
    expected: 'arc-bot'
  },
  {
    input: '(arc-bot)++',
    expected: '(arc-bot)'
  },
]

test('make sure karmaGetter gets karma right', testStrings(strings))

function testStrings (strings) {
  return function(t) {
    t.plan(strings.length)
    strings.forEach(function(el, index, array) {
      var res = karmaGetter(el.input)
      t.equal(res[0], el.expected, el.input + ' => ' + el.expected + ' = ' + res[0])
    })
  }
}
