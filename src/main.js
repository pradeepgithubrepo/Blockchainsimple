const { BlockChain, Transaction } = require('./blockchain')

let pradCoin = new BlockChain();

// pradCoin.addnewBlock(new Block(1, "26/2/2021", { amount: 5 }));

pradCoin.createTransaction(new Transaction('add1', 'add2', 100));
pradCoin.createTransaction(new Transaction('add2', 'add1', 55));
console.log("Mining Blocks :");
pradCoin.minePendingTransactions("pradeepaddress");
console.log("Get Wallet Balance:" + pradCoin.getWalletBalance("pradeepaddress"));
console.log(JSON.stringify(pradCoin, null, 4));
// 
console.log("Mining Blocks again1:");
pradCoin.minePendingTransactions("pradeepaddress");
console.log("Get Wallet Balance pradeep:" + pradCoin.getWalletBalance("pradeepaddress"));
console.log("Get Wallet Balance add1:" + pradCoin.getWalletBalance("add2"));
// pradCoin.addnewBlock(new Block(2, "27/2/2021", { amount: 15 }));

// console.log(JSON.stringify(pradCoin, null, 4))

// console.log("Block valid :" + pradCoin.isBlockValid())

// pradCoin.chain[1].data = "{ amount = 100 }"

// console.log("Block valid :" + pradCoin.isBlockValid())