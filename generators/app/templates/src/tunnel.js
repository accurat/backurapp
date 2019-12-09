const { tunnelPort } = require('ssh-tuna')
const { config } = require('dotenv')

config()

const { PORT, TUNNEL_DOMAIN, SSH_PORT } = process.env

const subdomain = '<%= appname %>'

tunnelPort(PORT, subdomain, TUNNEL_DOMAIN, SSH_PORT).then(() => {
  console.log(`Tunnel started on port ${PORT}, exposed to https://${subdomain}.${TUNNEL_DOMAIN}`)
})
