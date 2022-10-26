import { constants } from "buffer";
import { create } from "domain";
import React, { useState } from "react";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";
import { canisterId, createActor, token } from "../../../declarations/token/index";

function Faucet() {

  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisabled(true);

    // In case deploy canister online, on live ICP blockchain 
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    const result = await token.payOut();
    // In case deploy canister online, on live ICP blockchain 
    // const result = await authenticatedCanister.payOut();
    
    
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout"
          onClick={handleClick}
          disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
