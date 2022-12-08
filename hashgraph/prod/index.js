require('dotenv').config()
const { accountId, client } = require('../client')
const {
    TransferTransaction,
    Transaction,
    TokenId
} = require("@hashgraph/sdk")


const tokenId = TokenId.fromString(process.env.TOKEN_ID)
const serial = 1

const buildTx = (receiver) => {
    const transaction = new TransferTransaction()
        .addNftTransfer(tokenId, serial, accountId, receiver)
        .freezeWith(client)
    return transaction.toBytes()
}

const submitTx = async (bytesObj) => {
    const bytes = bytesFromObj(bytesObj)
    const transaction = TransferTransaction.fromBytes(bytes)
    const submit = await transaction.execute(client)
    const receipt = await submit.getReceipt(client)
    return receipt.status.toString() == "SUCCESS"
        ? true
        : false
}

const bytesFromObj = (obj) => {
    let byteArray = Object.values(obj)
    return Buffer.from(byteArray)
}

module.exports = {
    buildTx,
    submitTx
}