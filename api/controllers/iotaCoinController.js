'use strict';

const IOTA = require('iota.lib.js');
const Trytes = require('trytes');
var request = require('request');
var crypto = require('crypto');
const { createAccount }  = require('@iota/account');
// var Converter = require('@iota/converter');
const Utils = require('../../lib/utils');
const Config = require('../../config/default.json');
var iota = new IOTA({
    // provider: "https://nodes.devnet.thetangle.org:443"

        provider: "https://nodes.thetangle.org:443"


    // provider: "http://172.16.21.21:14265"
 });


 const listUnspent = async () => {
    try {
        let unspent = await client.listUnspent();
        return unspent;
    }
    catch (err) {
        //Failed to fetch unspent transactions.
        console.log(err);
    }

}

 



/**
 * Submits raw transaction (serialized, hex-encoded) to local node and network.
 *
 * @param  {String} Signed transaction
 * @return {String} Transaction Id
 */
const sendRawTransaction = async(signedTransaction) => {
    try {
        let sendTransactions = await client.sendRawTransaction(signedTransaction);
        return sendTransactions;
    }
    catch (err) {
        console.log(err);
    }
}

/**
 * Returns the current bitcoin address for receiving payments to this account.
 * If <account> does not exist, it will be created along with an associated
 * new address that will be returned.
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */


/**
 * If [account] is not specified, returns the server's total available
 * balance. If [account] is specified, returns the balance in
 * the account.
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */

    // iota.api.getNewAddress(req.query.seed, {index: parseInt(req.query.index) , total: 1, security: 3, checksum: true}, function(err, address) {
    //     console.log(address)
    //     var threshold=100;
    //     iota.api.getBalances(address,threshold,(error, result) => {const
    //     if (error) res.send({responseCode:500,responseMessage:"Inteconst Server Error"})
    //     else  res.send({responseCode:200,responseMessage:"SuccessfuconstgetBalance",data:result})
       
   
    // })
// })
    

/**
 * Returns up to [count] most recent transactions skipping the
 * first [from] transactions for account [account].const
 * If [account] not provided it'll return recent trconst
 * from all accounts.
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */

/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */



////////////////////////////////////////////////

// exports.getBalances = function(req, res) {
//     console.log("getBalances")
      
    
// var headers = {
//     'Content-Type': 'application/json',
//     'X-IOTA-API-Version': '1'
// };

// var dataString = '{"command": "getBalances", "addresses": ["F9JURSDDTOZDZPBIIZZMODEZHLUQHKSAIOAFUZEIGWIYFGQJBVAJSKQMCOXLBOEBUCCHWTTOWBRFDEIHBTVONSKWFW"], "threshold": 100}';

// var options = {
//     url: 'https://nodes.devnet.iota.org:443',
//     method: 'POST',
//     headers: headers,
//     body: dataString
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//         res.json({result:body});
//     }else{
//         res.json({error:error});
//     }
// }

// request(options, callback);

// };/////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////

exports.getNodeInfo = function(req, res) {
    console.log("getNodeInfo")
    iota.api.getNodeInfo((err,result)=>{
    if(err) return console.error(err);
    else res.send({responseCode: 200, data: result});
})
};

  ////////////////////////////////////////////////////////////////////////////////////////////// 
    exports.getNeighbors = function(req, res) {
      
        var headers = {
            'Content-Type': 'application/json',
            'X-IOTA-API-Version': '1'
        };
        var dataString = '{"command": "getNeighbors"}';
        
        var options = {
            url: 'http://172.16.21.21:14265',
            method: 'POST',
            headers: headers,
            body: dataString
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.json({result:body});
            }else{
                res.json({error:error});
            }
        }
     
        request(options, callback);

    };
    /////////////////////////////////////////////////////////////////////////

    exports.generateAddress = function(req, res) {
  
    
        var GenerateSeed = function () {
            const length       = 81;                            // The length of the seed and int array.
            const chars        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9"; // The allowed characters in the seed.
            var result       = new Array(length);               // An empty array to store the seed characters.
            var randomValues = Buffer.alloc(length)
            
            // Generate random values and store them to array.
            crypto.randomFillSync(randomValues);
            
            var cursor = 0;                                     // A cursor is introduced to remove modulus bias.
            for (var i = 0; i < randomValues.length; i++) {     // Loop through each of the 81 random values.
                cursor += randomValues[i];                      // Add them to the cursor.
                result[i] = chars[cursor % chars.length];       // Assign a new character to the seed based on cursor mod 81.
            }
            return result.join('');                             // Merge the array into a single string and return it.
        };
        
        
        
        var seed = GenerateSeed();
        console.log(seed);
        
        console.log("Length: %s", seed.length)
        
        iota.api.getNewAddress(seed,
          { "index": 0, "total": 1, "security": 2, checksum: true },
          function (error, success) {
              if (error) {
                  console.log("Error occured: %s", error);
              } else {
                  console.log();
                  console.log(success); //returned addresses are printed out
                  res.json({code:'200', seed:seed, address:success });
              }        
          });
            
            
        };
    
/////////////////////////////////////////


//attachTangle
exports.attachToTangle=(req,res)=>{
    console.log("attachToTangle")
    var transfers = [{
        'address': req.body.addressToAttach,
        'value': 0,
        }]
        var minWeightMagnitude = 14 // as in the light-wallet
        var depth = 3
        iota.api.sendTransfer(req.body.seed, depth, minWeightMagnitude, transfers, (e, bundle) => {
            console.log(e+"-------->"+"---------"+JSON.stringify(bundle))
            res.send({data:bundle})
        })
    };

    ////////////////////////////////////////



exports.performTransfer = function(req, res) {
    console.log("performTransfer")
    iota.api.prepareTransfers(req.body.seed,[{
        'address': req.body.fromAddress,
        'value': 0
    }], { 'inputs': [
        {
            address: req.body.firstAddress,
            balance: 0,
            keyIndex    : 0,
            security: 3
        }
        ]},(err,result) =>{

if(err) return console.error(err);
else    res.json({code: 200, data: result});
                    })

};

///////////////////////////////////////////////

//perform withdraw
exports.getAccountData=(req,res)=>{
    console.log("getAccountData")
        iota.api.getAccountData(req.body.seed,{},(err,result)=>{
            console.log("result", result)
            console.log(err)
            res.send({code:200,message:result})
        })

    }

    //////////////////////////////////////////
    exports.getTransactionsObjects = function(req, res) {
        console.log("getTransactionsObjects")
       var hash=[req.body.hash];
        iota.api.getTransactionsObjects(hash ,(err,result)=>{
        console.log(err,"-------------",result)
        if(err) res.send({responseCode:500,responseMessage:"Internal Server Error",error:err})
        else  res.send({responseCode:200,responseMessage:"Successfully getBalance",data:result})
    })
    
    
    };
    // exports.getBalances = (req, res) => {
//         var headers = {
//             'Content-Type': 'application/json',
//             'X-IOTA-API-Version': '1'
//         };
//         var dataString = '{"command": "getBalances"}';
        

//         console.log("getBalances")



// var dataString = '{"command": "getBalances", "addresses": ["ORDOVMBQRCWOKCFFVPMHZGQJFZPCDEHDJCAXKKPWREIYGGJTHXAAJWWNZN9MBRAA9EOOEODSCTQZJVLEZ"], "threshold": 100}';

// var options = {
//     url: 'https://nodes.thetangle.org:443',
//     method: 'POST',
//     headers: headers,
//     body: dataString
// };

// function callback(error, response, body) {

//        if (!error && response.statusCode == 200) {
//                 console.log(body);
//                 res.json({result:body});
//             }else{
//                 res.json({error:error});
//             }
//         }

// request(options, callback);
    //  console.log("getBalances")
    //     var threshold = 100;
    //             iota.api.getBalances(req.body.addresses,{},threshold,(err, result) => {
    //         // if (error) res.send({responseCode:500,responseMessage:"Internal Server Error"})
    //         // else  res.send({responseCode:200,responseMessage:"Successfully getBalance",data:result})
    //         console.log("result", result)
    //         console.log(err)
    //         res.send({code:200,message:result})
      
    //             })
    //             };


    exports.getBalances=(req,res)=>{
        console.log("getBalances")
        var threshold = 100 
            iota.api.getAccountData(req.body.addresses,threshold, (err,result)=>{
                console.log("result", result)
                console.log(err)
                res.send({code:200,message:result})
            })
    
        };
        