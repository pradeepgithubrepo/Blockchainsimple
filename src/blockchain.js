const SHA256 = require('crypto-js/sha256')

class Transaction {
    constructor(fromAddrss, toAddress, amount) {
        this.fromAddrss = fromAddrss;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateTransactionHash() {
        return SHA256(this.fromAddrss + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') != this.fromAddrss) {
            console.log("You cannot sign this!!")
        }
        const hashtxn = this.calculateTransactionHash();
        const sig = signingKey.sign(hashtxn, 'base64');
        this.signature = sig.toDER('hex');
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString()
    }

    mineBlock(difficulty) {
        console.log("first hit : " + this.hash.substring(0, difficulty))
        console.log("second hit : " + Array(difficulty + 1).join("0"))
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block Mined:" + this.hash);
        // return this.hash;
    }

}

class BlockChain {
    constructor() {
        this.chain = [this.creategenesisBlock()];
        this.pendinTransactions = [];
        this.miningReward = 100;
        this.difficulty = 2;
    }

    creategenesisBlock() {
        return new Block(Date.now(), "Gen Block", "0000")
    }

    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addnewBlock(newBlock) {
    //     newBlock.previousHash = this.getlatestBlock().hash;
    //     newBlock.hash = newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock)
    // }

    minePendingTransactions(miningRewardAddress) {
        let newblock = new Block(Date.now(), this.pendinTransactions);
        newblock.mineBlock(this.difficulty);
        newblock.previousHash = this.getlatestBlock().hash;
        this.chain.push(newblock);
        this.pendinTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    createTransaction(transaction) {
        this.pendinTransactions.push(transaction);
    }

    getWalletBalance(walletAddress) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddrss == walletAddress) {
                    balance = balance - trans.amount
                }

                if (trans.toAddress == walletAddress) {
                    balance = balance + trans.amount
                }
            }
        }
        return balance;
    }

    isBlockValid() {
        for (let i = 1; i < this.chain.length - 1; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currBlock.previousHash != prevBlock.hash) {
                return false;
            }

            if (currBlock.hash != currBlock.calculateHash()) {
                return false;
            }

        }
        return true;
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;

