const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors')
const { Users } = require('./helpers/users');
const uuidv4 = require('uuid/v4')

const PORT = 8000

const app = express();
app.use(cors)
const server = http.createServer(app);
var io = socketIO(server);

const createChat = ({messages = [], name = "Community", users = []} = {})=>(
	{
		id:uuidv4(),
		name,
		messages,
		users,
		typingUsers:[]
	}
)

const createMessage = ({message = "", author} = { })=>(
		{
			id:uuidv4(),
			message,
			author
		}

	)

function sendMessageToChat(author, chatId, message){
  	io.emit(`NEW_MSG-${chatId}`, createMessage({message, author}))
}

const users = new Users()
let communityChat = createChat()

io.on('connection', (socket) => {
  console.log("socket:",socket.id)

  socket.on('VERIFY_USER',(name,callback)=>{
    const sameNamedUsers = users.verifyUserName(name)
    if(!sameNamedUsers.length){
      users.removeUser(socket.id);
      const currentUser = users.addUser(socket.id, name);
      callback({user:currentUser,isAlreadyUser:false})
    }else{
      callback({user:null,isAlreadyUser:true})
    }
  })

  socket.on('USER_CONNECTED',()=>{
    console.log(users);
    io.emit('UPDATE_USERLIST', users)
  })

  socket.on('COM_CHAT',(callback)=>{
    callback(communityChat)
  })

  socket.on('LOGOUT',()=>{
    users.removeUser(socket.id)
    io.emit('UPDATE_USERLIST', users)
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    console.log(users);
    io.emit('UPDATE_USERLIST', users)
  });

  socket.on('MESSAGE_SENT', (data)=> {
    const currentUser = users.getUser(socket.id)
    sendMessageToChat(currentUser, data.chatId, data.message)
  })

  socket.on('PRIVATE_MESSAGE', ({receiver, author})=>{
    const newChat = createChat({ name:`${receiver.name}&${author.name}`, users:[receiver, author] })
    socket.to(receiver.id).emit('PRIVATE_MESSAGE', newChat)
		socket.emit('PRIVATE_MESSAGE', newChat)
  })

})


server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
