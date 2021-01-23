import {Request, Response} from 'express';
const express = require('express');

const app = express();
const port = 8080;

// route handler for the default home page
app.get( "/", (req: Request, res: Response ) => {
    res.send( "hey" );
} );

// start the express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );