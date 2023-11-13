const socket= io('http://localhost:8000')
       //get DOM variables in respective js variables

const form = document.getElementById('send-container');               // Call by id
const messageInput = document.getElementById('messageInp');           // Call by id
const messageContainer = document.querySelector(".container");        // yaha se container class me message bhej diye

   //Audio that will play on receiving messages
var audio = new Audio('tone.mp3');

   //function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;                              //This whole para doubt
    messageElement.classList.add('message')
    messageElement.classList.add(position) 
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

        //Ask new user for his/her name  and let the server know
 const names = prompt("Enter your name to join");
 socket.emit('new-user-joined', names);

       // If a user join, receive the event from the server
 socket.on('user-joined', names =>{
    append(`${names} joined the chat`, 'right')
 })

      // if server sents a message, receive it
 socket.on('receive', data =>{
    append(`${data.names}: ${data.message}`,'left')
 });

      // if user leaves the chat, append the info to the container
 socket.on('left', name =>{
    append(`${names} left the chat`, 'right');
 });
 
      // If a form gets submitted, send message to the server
 form.addEventListener('submit', (e)=>{              // This fires event when we click on submit button
    e.preventDefault();                       //page not reload again and again
    const message = messageInput.value;
    append(`You: ${message}`,'right');               // jb hum message bhejenge then how our message will look
    socket.emit('send', message);                
    messageInput.value = ''               //After sending the message, make message box clear
})