const { publishCast } = require("@standard-crypto/farcaster-js");

document.getElementById("cast-button").addEventListener("click", sendCast);
let text = document.getElementById("textarea");

let message = document.getElementById("message");

//do not judge me on the following lines of code
async function sendCast() {
  if (
    localStorage.getItem("privateKey") === "" ||
    localStorage.getItem("privateKey") === null
  ) {
    message.textContent = "Please enter a valid seed phrase";
    message.style.visibility = "visible";
    setTimeout(() => {
      message.style.visibility = "hidden";
    }, 3000);
  } else {
    try {
      await publishCast(localStorage.getItem("privateKey"), text.value);

      message.textContent = "Cast sent successfully";
      message.style.visibility = "visible";
      setTimeout(() => {
        message.style.visibility = "hidden";
      }, 3000);
    } catch (e) {
      message.textContent = "Cast failed to send";
      message.style.visibility = "visible";
      setTimeout(() => {
        message.style.visibility = "hidden";
      }, 3000);
      console.log("there was an error");
    }

    //clear textarea
    let textarea = document.getElementById("textarea");
    textarea.value = "";
  }
}
