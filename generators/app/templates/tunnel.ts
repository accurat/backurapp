import got from 'got'
import { Socket } from 'net'
import { Client } from 'ssh2'

const { USER, SSH_AUTH_SOCK, TUNNEL_DOMAIN, SSH_PORT, PORT } = process.env

const protocol = TUNNEL_DOMAIN === 'localhost' ? 'http' : 'https'

function createClient(config, onReadyCb, onConnectionCb) {
  const conn = new Client()
  const errors = []

  conn.on('ready', () => {
    onReadyCb()
    conn.forwardIn(config.dstHost, config.dstPort, (err, port) => {
      if (err) return errors.push(err)
      conn.emit('forward-in', port)
    })
  })

  conn.on('tcp connection', (info, accept, reject) => {
    let remote
    const srcSocket = new Socket()

    srcSocket.on('error', err => {
      errors.push(err)
      if (remote === undefined) {
        reject()
      } else {
        remote.end()
      }
    })

    srcSocket.connect(config.srcPort, config.srcHost, () => {
      remote = accept()
      srcSocket.pipe(remote).pipe(srcSocket)
      if (errors.length === 0) {
        onConnectionCb(null, conn)
      } else {
        onConnectionCb(errors, null)
      }
    })
  })
  conn.connect(config)
  return conn
}

function tunnelPort(localPort, subdomain) {
  return got
    .post(`${protocol}://${TUNNEL_DOMAIN}?subdomain=${subdomain}`, { json: true })
    .then(res => {
      const { port, error } = res.body
      if (error) throw error
      return port
    })
    .then(dstPort => {
      return new Promise((resolve, reject) => {
        return createClient(
          {
            host: TUNNEL_DOMAIN,
            port: Number(SSH_PORT),
            dstHost: 'localhost',
            dstPort: dstPort,
            srcHost: 'localhost',
            srcPort: localPort,
            keepAlive: true,
            agent: SSH_AUTH_SOCK,
            username: USER,
          },
          () => resolve(`${protocol}://${subdomain}.${TUNNEL_DOMAIN}`),
        )
      })
    })
}

tunnelPort(PORT, '<%= appname %>')
