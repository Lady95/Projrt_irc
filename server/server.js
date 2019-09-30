const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = 4000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let user = []; 

io.on('connection', socket => {
  socket.on('username', (username, userOld, nick) => {   
   
    let verifUser = user.includes(username); 

    if(verifUser === false){
     
      if(nick === '/nick'){
        if(userOld !== null){
          const index = user.indexOf(userOld);
          user.splice(index, 1, username);
        }  
      } else {
        user.push(username)
      }
     
      console.log('username : ' + username + ' is connect')

      socket.emit('user', username); 
      console.log(user)
    } else {
      console.log(username + ' existe déja'); 
    }
    
    socket.on('disconnect', function(){
      const index = user.indexOf(username); 
      console.log(username +' is disconnected');
      user.splice(index, 1); 
    });
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); 
  });
  
  socket.emit('users', user)
  
})
server.listen(port, () => console.log(`Listening on port ${port}`))