import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token/index";

function Transfer() {

  const [recipentId, setId] = useState("");
  const [amout, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    const recipent = Principal.fromText(recipentId);
    const amountToTransfer = Number(amout);
    const result = await token.transfer(recipent, amountToTransfer);
    setDisabled(false);
    setHidden(false);
    setDisabled(false);

  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipentId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amout}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer"
            onClick={handleClick}
            disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
