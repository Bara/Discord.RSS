const http = require('http')
const DiscordRSS = require('./index.js')
const config = require('./config.json')

const server = http.createServer((req, res) => {
  const { method, headers } = req
  console.log('Incoming "%s" request, User-Agent: "%s"', method, headers['user-agent'])
  res.end('OK')
})
server.listen(process.env.PORT, () => {
  console.log('Server started')
})

const drss = new DiscordRSS.Client({ readFileSchedules: true, setPresence: true })
let token = config.bot.token

try {
  const override = require('./settings/configOverride.json')
  token = override.bot && override.bot.token ? override.bot.token : token
} catch (err) {}

drss.login(token)
