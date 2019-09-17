'use strict';
module.exports = function(app) {
  var  iota = require('../controllers/iotaCoinController');
console.log("HERE");


   app.route('/iota/address') 
   .post(iota.generateAddress);

   app.route('/iota/getNeighbors')
     .get(iota.getNeighbors);

     app.route('/iota/getNodeInfo')
     .get(iota.getNodeInfo);

//////////////////// seed req
     app.route('/iota/getAccountData')
     .post(iota.getAccountData);

///////////////// seed req and addressattach to tangle
    app.route('/iota/attachToTangle')
     .post(iota.attachToTangle);

   app.route('/iota/getBalances')
     .post(iota.getBalances);

//////////////////// hash req /from attachtotangle
   app.route('/iota/getTransactionsObjects')
     .post(iota.getTransactionsObjects);

///// seed req,fromAddress and firstAddress req
   app.route('/iota/performTransfer')
   .post(iota.performTransfer);
    
 };