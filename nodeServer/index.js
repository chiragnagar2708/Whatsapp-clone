const io = require('socket.io')(8000)            // io is socket or server, as server start, io starts listening
const users = {};

io.on('connection', socket =>{                   //io.on is socket.io instance which listens the connection,if anyone come inside it

                                                 //If any new user join, let other users connected to the server know
    socket.on('new-user-joined', names =>{            //socket.on handle the event that happen with the connection
        
        console.log("New user", names );
        users[socket.id] = names;                    // It gives the name to user
        socket.broadcast.emit('user-joined', names)       //It gives the message to all the members except who was join the event
    });

                      // If someone sends a message, broadcast to all other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, names: users[socket.id]})
    });    

                          //If someone leaves the chat, let the other users know
    socket.on('disconnect', message =>{                       //disconnect is inbuild feature
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})


// run by nodemon index.js