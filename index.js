var irc = require('irc')
var levelup = require('level')

var karmaGetter = require('./lib/karma').karmaGetter

var db = levelup('./karmadb', {
  encoding: 'json'
})

var config = {
  channels: ['#arc'],
  server: 'irc.cat.pdx.edu',
  botName: 'arc-bot'
}

var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels,
  debug: false
})

bot.addListener('join', function(channel, who) {
  console.log(channel, who)
})

bot.addListener('message#', function(from, to, text, message) {
  if (bot.debug) {
    console.log(from, to, text)
  }
  var karma = karmaGetter(text)
  if (karma.length > 0) {
    karmaSaver(karma[0], function(err, totalKarma) {
      if (err) {
        return console.log(err)
      }
      bot.say(to, [karma[0], 'has', totalKarma, 'karma'].join(' '))
    })
  }
})

bot.addListener('pm', function(from, text, message) {
  console.log('PM: ', from, text)
})

function karmaSaver (recipient, cb) {
  db.get(recipient, function(err, value) {
    if (err) {
      if (err.type === 'NotFoundError') {
        // Initialize the name
        return db.put(recipient, {
          karma: 1
        }, function(err) {
            return err ? cb(err) : cb(null, 1)
          })
      } else {
        return cb(err)
      }
    }
    var newKarma = value.karma + 1
    db.put(recipient, {
      karma: newKarma
    }, function(err) {
        return err ? cb(err) : cb(null, newKarma)
      })
  })
}
