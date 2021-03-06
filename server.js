const http = require('http');

const app = require('./app');

const port = process.env.PORT || 2626;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Graphql server is listening for requests on ${port}.`);
});
