import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug"

actor Token {
    var owner : Principal = Principal.fromText("qi64a-brrro-mjwuy-k26g3-koqlr-nyv5x-mkx2h-opi4d-s2l2f-4rr5z-zae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DANG";
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf(who : Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared (msg) func payOut() : async Text {
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            let result = await transfer(msg.caller, amount);
            Debug.print(debug_show (msg.caller));
            return "Success";
        }else{
            return "Already";
        };

    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text{
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newFromBalance :  Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);
            return "success";
        }else{
            return "Insufficient Funds";
        }; 
        
    };
};
