const { server, port } = require('./app')

server.listen(port, () => {
  console.log(`Wella! <%= appname %> is listening to localhost:${port}`)
})
