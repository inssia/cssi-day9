
var SHA256 =  new Hashes.SHA256


const submitMessage = () => {
    const passcodeField =  document.querySelector("#passcode");
    let passcode = passcodeField.value;
    const messageField = document.querySelector("#message");
    const message = messageField.value;
    passcode = Number(passcode);

    if (isNaN(passcode)) {
        alert("Passcode must be a 4 digit number!");
    } else if (numDigits(passcode) != 4) {
        alert("Passcode must have 4 digits!")
    } else {
    passcode = passcode.toString();
    passcode = SHA256.hex(passcode);
    firebase.database().ref("/messages").push({
        passcode: passcode, 
        message: message
    });
    alert("Message sent!");
    passcodeField.value = "";
    messageField.value="";
    }
}

function numDigits(x) {
  return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}