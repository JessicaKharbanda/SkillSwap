require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
// const server = http.createServer(app);



//db
const connectDB = require('./db/connect');

// authenticate middleware
const autheticateUser = require('./middleware/authentication');
// const getMapMyIndiaAccessToken = require('./middleware/getMapMyIndiaAccessToken');
//router

const mainRouter = require('./routes/main');
const profileRouter = require('./routes/userProfile');
const notificationsRoute = require('./routes/notification');
const chatRequestRoutes = require('./routes/chatRequest');
const chatRoutes = require('./routes/chatService');
const messageRoute = require('./routes/messageRoute');
// const taskRelatedRoute = require('./routes/singleTaskRoute');
const taskListRelatedRoute = require('./routes/tasklistRoutes');
// const imageRoutes = require('./routes/imageUpload');
const QuestionAndAnswerRoute = require('./routes/Q&ARoute');
//error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//matching algo
const matchingRoute = require('./routes/matchingAlgorithm');

// middleware
app.use(express.static('./public'));
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(cors());


app.use('/api/v1/auth', mainRouter);  // fully implemented 
app.use('/api/v1/profile', autheticateUser, profileRouter); // fully implemented
app.use('/api/v1/matching', autheticateUser,matchingRoute);
app.use('/api/v1/send', autheticateUser,notificationsRoute);
app.use('/api/v1/chat-request', autheticateUser, chatRequestRoutes);
app.use('/api/v1/chat',autheticateUser, chatRoutes);
app.use('/api/v1/message',autheticateUser, messageRoute);
// app.use('/api/v1/task-related',autheticateUser, taskRelatedRoute);
app.use('/api/v1/tasklist-related',autheticateUser, taskListRelatedRoute)
app.use('/api/v1/Q&A', QuestionAndAnswerRoute);
// app.use('/api/v1/upload', autheticateUser, imageRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
const server=app.listen(port, () =>
console.log(`Server is listening on port ${port}...`)
);
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});


io.on('connection', (socket) => {
  console.log('Connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');
  });

  socket.on('join chat', (room) => {    //chattid
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });



  // socket.on('typing', (room) => socket.in(room).emit('typing'));
  // socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageReceived) => {
    console.log('ishita')
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived);
    });
  });

});


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // app.listen(port, () =>
    //   console.log(`Server is listening on port ${port}...`)
    // );
  } catch (error) {
    console.log(error);
  }
};

start();

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI)
//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//     // socket.io 
// // const io = require('socket.io')(server, {
// //   pingTimeout: 60000,
// //   cors: {
// //     origin: 'http://localhost:3000',
// //   },
// // });

// // io.on('connection', (socket) => {
// //   console.log('Connected to socket.io');
// //   socket.on('setup', (userData) => {
// //     socket.join(userData._id);
// //     socket.emit('connected');
// //   });

//   // socket.on('join chat', (room) => {    //chattid
//   //   socket.join(room);
//   //   console.log('User Joined Room: ' + room);
//   // });

//   // socket.on('typing', (room) => socket.in(room).emit('typing'));
//   // socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

//   // socket.on('new message', (newMessageReceived) => {
//   //   var chat = newMessageReceived.chat;

//   //   if (!chat.users) return console.log('chat.users not defined');

//   //   chat.users.forEach((user) => {
//   //     if (user._id == newMessageReceived.sender._id) return;

//   //     socket.in(user._id).emit('message received', newMessageReceived);
//   //   });
//   // });

//   // socket.on('disconnect', () => {
//   //   console.log('USER DISCONNECTED');
//   //   // Handle user disconnection here
//   // });

//   } catch (error) {
//     console.log(error);
//   }
// };

// start();