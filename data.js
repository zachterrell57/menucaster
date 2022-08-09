const { ethers } = require("ethers");

document
  .getElementById("seed-phrase-button")
  .addEventListener("click", setSeedPhrase);

let text = document.getElementById("mnemonic-textarea");
text.value = localStorage.getItem("seedPhrase");

function getPkeyFromMnemonic(mnemonic) {
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(
    "m/44'/60'/0'/0/1230940800"
  );

  return hdNode.privateKey;
}

function setSeedPhrase() {
  let textarea = document.getElementById("mnemonic-textarea");
  let text = textarea.value;

  localStorage.setItem("seedPhrase", text);
  let seedPhrase = localStorage.getItem("seedPhrase");

  let message = document.getElementById("save-message");

  let pkey = "";
  try {
    pkey = getPkeyFromMnemonic(seedPhrase);
    message.textContent = "Seed phrase saved";
    message.style.visibility = "visible";
    setTimeout(() => {
      message.style.visibility = "hidden";
    }, 3000);
  } catch (e) {
    console.log(e);
    message.textContent = "Seed phrase failed to save";
    message.style.visibility = "visible";
    setTimeout(() => {
      message.style.visibility = "hidden";
    }, 3000);
  }
  localStorage.setItem("privateKey", pkey);
}
