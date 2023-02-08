import express from 'express'
import route from './route';


const server = express();

server.use(express.json())
server.use(route)

server.listen( process.env.PORT || 3333, () =>  {
  console.log(`🤖 server start on port ${process.env.PORT || 3333}` )
})
