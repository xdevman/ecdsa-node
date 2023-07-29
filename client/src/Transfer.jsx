import { useState } from "react";
import server from "./server";
import { hashMessage, signMessage } from "./scripts/crypto-client";
import { toHex } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance,privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  const mainmassage = 'this is a msg for sign';
  async function transfer(evt) {
    evt.preventDefault();

    try {
      const massagehash = toHex(hashMessage(mainmassage))
      let massagesigned = signMessage(massagehash,privateKey)
      massagesigned = JSON.stringify({
        ...massagesigned,
        r: massagesigned.r.toString(),
        s: massagesigned.s.toString(),});
      // console.log("log : ", massagehash)
      // console.log("log : ", massagesigned)

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        massagehash:massagehash,
        massagesigned:massagesigned,
      });
      setBalance(balance);
    } catch (ex) {

      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
    
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
