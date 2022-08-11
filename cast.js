const { publishCast } = require("@standard-crypto/farcaster-js");
const { ethers } = require("ethers");

function isValidMnemonic(mnemonic) {
  try {
    ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(
      "m/44'/60'/0'/0/1230940800"
    );
    return true;
  } catch (e) {
    return false;
  }
}

document.getElementById("cast-button").addEventListener("click", sendCast);
let text = document.getElementById("textarea");

let message = document.getElementById("message");

let alertText =
  "You might be casting your seed phrase, please double check your message";

//do not judge me on the following lines of code
async function sendCast() {
  //make sure user is not casting their seed phrase
  if (isValidMnemonic(text.value)) {
    alert(alertText);
    return;
  }

  if (
    localStorage.getItem("privateKey") === "" ||
    localStorage.getItem("privateKey") === null
  ) {
    //error message
    message.textContent = "Please enter a valid seed phrase";
    message.style.visibility = "visible";
    setTimeout(() => {
      message.style.visibility = "hidden";
    }, 3000);
  } else {
    try {
      //publish the cast
      await publishCast(localStorage.getItem("privateKey"), text.value);

      //success message
      message.textContent = "Cast sent successfully";
      message.style.visibility = "visible";
      setTimeout(() => {
        message.style.visibility = "hidden";
      }, 3000);
    } catch (e) {
      //error message
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
