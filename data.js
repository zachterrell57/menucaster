const { ethers } = require("ethers");

function getPkeyFromMnemonic(mnemonic) {
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(
    "m/44'/60'/0'/0/1230940800"
  );

  return hdNode.privateKey;
}

document
  .getElementById("seed-phrase-button")
  .addEventListener("click", setSeedPhrase);

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

document.getElementById("seed-phrase-info").addEventListener("click", () => {
  alert(
    "The 12-word recovery phrase associated with your Farcaster Ethereum address and username. Use this to sign in to Menucaster. Your seed phrase is only stored locally, and is not sent to any server."
  );
});
