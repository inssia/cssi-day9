var SHA256 =  new Hashes.SHA256

// Retrieve the messages from the database
const getMessages = () => {
 const messagesRef = firebase.database().ref('/messages');
 messagesRef.on('value', (snapshot) => {
     const data = snapshot.val();
     findMessage(data);
 });
}

let found = false;
let counterAttempts = 0;

const findMessage = (messages) => {
 let passcodeAttempt = document.querySelector('#passcode').value;
      passcodeAttempt = Number(passcodeAttempt);
          if (isNaN(passcodeAttempt)) {
        alert ("Passcode must be a 4 digit number");
    } else {
 for (message in messages) {
     const messageData = messages[message];
     passcodeAttempt = passcodeAttempt.toString();
     console.log("huh?", messageData.passcode, SHA256.hex(passcodeAttempt));
     if (messageData.passcode === Number(passcodeAttempt)) { 
         renderMessageAsHtml(messageData.message);
         found = true;
     } else if (messageData.passcode === SHA256.hex(passcodeAttempt)) {
         console.log("huh?", messageData.passcode, SHA256.hex(passcodeAttempt));
     }
 }
}

if (!found) {
    counterAttempts++;
    console.log(counterAttempts);

}



}



const renderMessageAsHtml = (message) => {
 // Hide Input Form
 const passcodeInput = document.querySelector('#passcodeInput');
passcodeInput.style.display = 'none';

 // Render messageas HTML
  
 const messageDiv = document.querySelector('#message');
messageDiv.innerHTML = message;
}