import { Request, Response } from 'express';
import { connectionSetup } from './socket.io';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
      }
});

const port = 8080;

// route handler for the default home page
app.get( "/", (req: Request, res: Response ) => {
    res.send( "hey" );
} );

io.on('connection', connectionSetup);

// start the express server
http.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );