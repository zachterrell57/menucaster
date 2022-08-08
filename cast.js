const { publishCast } = require("@standard-crypto/farcaster-js");
const { ethers } = require("ethers");

document.getElementById("button").addEventListener("click", sendCast);
let text = document.getElementById("textarea");

const mnemonic = "";

let privateKey = "";

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
  } catch (e) {
    console.log("there was an error");
  }
}
