const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');


app.use(cors());
app.use(express.json());

const balances = {
  //private Key:  3eea91d09e674224ce47b9fbf872adcb9a88ea6a85c5f88c4a591281fb14d59e
  "030ec01198af6daa1c91d9286d7018f34cb7a1577c6245fb0389dabe4761849ea4": 100,

  //private Key:  b89e7b3cd197c1bfef74454ad2c1d103340926386fdf31218328d034888c52f2
  "0388697fd8af3d3f1896959287edcd6fa98d2a8d13bc441f1ad1c3b422383b1b74": 50,

  //private Key:  8d104ad1b9995fbdd86fef8c923376d91d08928bb2533d16d1b0b56c5a4f80c6
  "03129d6b2e71810c4bf4399c7b64b7c5295f9a40cdc6cd6e3be812068d65124017": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount,massagehash,massagesigned } = req.body;
  // console.log('sender: ', sender);
  // console.log(' recipient: ',recipient);
  // console.log(' amount: ',amount);
  // console.log(' signature: ',massagesigned);
  // console.log(' sendMessageHashed: ',massagehash);
  let Signature = JSON.parse(massagesigned);
  Signature.r = BigInt(Signature.r);
  Signature.s = BigInt(Signature.s);
  isverify = secp.secp256k1.verify(Signature,massagehash,sender)

  if (!isverify){
    
    res.status(400).send({ message: "Unauthorized Transaction" });
    return;
  }
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
