const { publishCast } = require("@standard-crypto/farcaster-js");
const { ethers } = require("ethers");

document.getElementById("cast-button").addEventListener("click", sendCast);
let text = document.getElementById("textarea");

function getPkeyFromMnemonic(mnemonic) {
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(
    "m/44'/60'/0'/0/1230940800"
  );

  privateKey = hdNode.privateKey;
}

async function sendCast() {
  getPkeyFromMnemonic(mnemonic);
  try {
    await publishCast(privateKey, text.value);

    document.getElementById("message").textContent = "Cast sent successfully";
    document.getElementById("message").style.visibility = "visible";
    setTimeout(() => {
      document.getElementById("message").style.visibility = "hidden";
    }, 3000);
  } catch (e) {
    document.getElementById("message").textContent = "Cast failed to send";
    document.getElementById("message").style.visibility = "visible";
    setTimeout(() => {
      document.getElementById("message").style.visibility = "hidden";
    }, 3000);
    console.log("there was an error");
  }

  //clear textarea
  let textarea = document.getElementById("textarea");
  textarea.value = "";
}
