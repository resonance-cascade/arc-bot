var test = require('tape')

var karmaGetter = require('../lib/karma').karmaGetter

var strings = [
  {
    input: 'Im just a silly chat message with no karma!',
    out: null
  },
  {
    input: 'bloopy++',
    out: 'bloopy'
  },
  {
    input: 'smoopy boopy++',
    out: 'boopy'
  },
  {
    input: 'lots++ of++ karma++',
    out: 'lots'
  },
  {
    input: 'arc-bot++',
    out: 'arc-bot'
  },
  {
    input: '(arc-bot)++',
    out: null
  },
  {
    input: 'woo!++',
    out: 'woo!'
  },
  {
    input: '#!++',
    out: '#!'
  },
  {
    input: 'hujfsdfgbvdwe....++',
    out: 'hujfsdfgbvdwe....'
  },
  {
    input: 'Ant_++',
    out: 'Ant_'
  },
  {
    input: '(that++)++',
    out: 'that'
  },
  {
    input: 'gRegor`++',
    out: 'gRegor`'
  }
]

test('make sure karmaGetter gets karma right', testStrings(strings))

function testStrings (strings) {
  return function StringTest (t) {
    t.plan(strings.length)
    strings.forEach(function(el) {
      var res = karmaGetter(el.input)
      t.equal(res[0], el.out, el.input + ' => ' + res[0] + ' = ' + el.out)
    })
  }
}
