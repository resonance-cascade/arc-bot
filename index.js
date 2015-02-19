var irc = require('irc')

var config = {
  channels: ['#arc'],
  server: 'irc.cat.pdx.edu',
  botName: 'arc-bot'
}

var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels,
  debug: true
})

bot.addListener('join', function(channel, who) {
  console.log(channel, who)
})

bot.addListener('message#', function(from, to, text, message) {
  console.log(from, to, text)
  var karma = karmaGetter(text)
  if (karma) {
    karmaSaver(karma[0], function(err, totalKarma) {
      if (err) {
        console.log(err)
      }
      bot.say(to, [karma[0], 'has', totalKarma, 'karma'].join(' '))
    })
  }
})

bot.addListener('pm', function(from, text, message) {
  console.log('PM: ', from, text)
})

function karmaGetter (string) {
  return string.match(/\w+(?=\+{2})/)
}

function karmaSaver (recipient, cb) {
  cb(null, 'over 5000')
}
