import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { default as Crypto} from 'crypto-js';
var accounts;
var account;
var foodSafeABI = JSON.parse('[{"constant":false,"inputs":[{"name":"LocationId","type":"uint256"},{"name":"Name","type":"string"},{"name":"Secret","type":"string"}],"name":"AddNewLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"GetTrailCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"TrailNo","type":"uint8"}],"name":"GetLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"GetAllLocations","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
var foodSafeContract;
var foodSafeCode ="0x60806040526000600160006101000a81548160ff021916908360ff16021790555034801561002c57600080fd5b506106b18061003c6000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633937fda514610067578063988bbca31461007e578063bbe42af814610137578063e3fd1ec214610168575b600080fd5b34801561007357600080fd5b5061007c610292565b005b34801561008a57600080fd5b5061013560048036038101908080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610294565b005b34801561014357600080fd5b5061014c6103ca565b604051808260ff1660ff16815260200191505060405180910390f35b34801561017457600080fd5b50610196600480360381019080803560ff1690602001909291905050506103e1565b604051808060200186815260200185815260200184815260200180602001838103835288818151815260200191508051906020019080838360005b838110156101ec5780820151818401526020810190506101d1565b50505050905090810190601f1680156102195780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b83811015610252578082015181840152602081019050610237565b50505050905090810190601f16801561027f5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b565b61029c6105b0565b82816000018190525083816020018181525050818160800181905250428160600181815250506000600160009054906101000a900460ff1660ff161415156103125760008060018060009054906101000a900460ff160360ff168152602001908152602001600020600101548160400181815250505b80600080600160009054906101000a900460ff1660ff16815260200190815260200160002060008201518160000190805190602001906103539291906105e0565b50602082015181600101556040820151816002015560608201518160030155608082015181600401908051906020019061038e9291906105e0565b509050506001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff1602179055505050505050565b6000600160009054906101000a900460ff16905090565b6060600080600060606000808760ff1681526020019081526020016000206000016000808860ff168152602001908152602001600020600101546000808960ff168152602001908152602001600020600201546000808a60ff168152602001908152602001600020600301546000808b60ff168152602001908152602001600020600401848054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104fa5780601f106104cf576101008083540402835291602001916104fa565b820191906000526020600020905b8154815290600101906020018083116104dd57829003601f168201915b50505050509450808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105965780601f1061056b57610100808354040283529160200191610596565b820191906000526020600020905b81548152906001019060200180831161057957829003601f168201915b505050505090509450945094509450945091939590929450565b60a06040519081016040528060608152602001600081526020016000815260200160008152602001606081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061062157805160ff191683800117855561064f565b8280016001018555821561064f579182015b8281111561064e578251825591602001919060010190610633565b5b50905061065c9190610660565b5090565b61068291905b8082111561067e576000816000905550600101610666565b5090565b905600a165627a7a72305820f9fd7eaaf3e6be61e8214fd0948ccb15498a2537cc580b0a16144a2fb4ebba5c0029";
var i=0;
var text="";
window.App = {
  start: function() {
    var self = this;
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount= account;
      foodSafeContract = web3.eth.contract(foodSafeABI);
    });
  },
  
  createContract: function()
  {
    foodSafeContract.new("", {from:account, data: foodSafeCode, gas: 3000000}, function (error, deployedContract){
      if(deployedContract.address)
      {
        document.getElementById("contractAddress").value=deployedContract.address;
      }
    })
  },

  addNewLocation: function() {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    var locationId = document.getElementById("locationId").value;
    var locationName = document.getElementById("locationName").value;
    var secret = document.getElementById("secret").value;
    var passPhrase = document.getElementById("passPhrase").value;
    console.log(locationId);
    console.log(locationName);
    console.log(secret);
    console.log(passPhrase);

    var encryptedSecret = Crypto.AES.encrypt(secret, passPhrase).toString();
    console.log(encryptedSecret);
    deployedFoodSafe.AddNewLocation(locationId, locationName, encryptedSecret, function(err) {
      console.log(err);
    })
  },

  getCurrentLocation: function() {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var passPhrase = document.getElementById("passPhrase").value;
    deployedFoodSafe.GetTrailCount.call(function (error, trailCount){
      deployedFoodSafe.GetLocation.call(trailCount-1, function(error, returnValues){
        document.getElementById("locationId").value= returnValues[1];
        document.getElementById("locationName").value = returnValues[0];
        var encryptedSecret = returnValues[4];
        var decryptedSecret = Crypto.AES.decrypt(encryptedSecret, passPhrase).toString(Crypto.enc.Utf8);
        document.getElementById("secret").value=decryptedSecret;
      })
    })    
  },

  getAllLocations: function(){
    var contractAddress = document.getElementById("contractAddress").value;
   var deployedFoodSafe = foodSafeContract.at(contractAddress);
   
   
    //var passPhrase = document.getElementById("passPhrase").value;
    deployedFoodSafe.GetTrailCount.call(function (error, trailCount){
     document.getElementById("locations").innerHTML="Track the path and info: ("+trailCount+ " locaction blocks available in the Blockchain)";
              if(i<trailCount){
                deployedFoodSafe.GetLocation.call(i, function(error, returnValues){
       
                  //document.getElementById("locationName").value = returnValues[0];
                  text=text+"<br>Block Number("+(i+1)+") Location ID: "+returnValues[1]+", Location Name: "+returnValues[0];+"<br>";
                 i++;
                
                })

              }
              
        
      //deployedFoodSafe.GetLocation.call(trailCount-1, function(error, returnValues){
       
       // document.getElementById("locationName").value = returnValues[0];
       document.getElementById("demo").innerHTML=text;
      
      //})
    })
    
   
  }
};

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.  If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
