import { tunnelPort } from 'ssh-tuna'
import { config } from 'dotenv'

config()

const { PORT, TUNNEL_DOMAIN, SSH_PORT } = process.env

const subdomain = '<%= appname %>'

tunnelPort(Number(PORT), subdomain, TUNNEL_DOMAIN, Number(SSH_PORT)).then(() => {
  console.log(`Tunnel started on port ${PORT}, exposed to https://${subdomain}.${TUNNEL_DOMAIN}`)
})
