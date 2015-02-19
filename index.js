var irc = require('irc');

var config = {
	channels: ['#arc'],
	server: 'irc.cat.pdx.edu',
	botName: 'arc-bot'
}

var bot = new irc.Client(config.server, config.botName, { channels: config.channels, debug: true })

bot.addListener('join', function(channel, who) {
	console.log(channel, who)
})

bot.addListener('message', function(from, to, text, message) {
	console.log(from, to, text)
})

