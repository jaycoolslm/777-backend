require('dotenv').config()
const {
    Client,
    PrivateKey,
    AccountId
} = require("@hashgraph/sdk")

const accountId = AccountId.fromString(process.env.ACCOUNT_ID)
const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY)
const client = Client.forTestnet().setOperator(accountId, privateKey)

module.exports = {
    accountId,
    privateKey,
    client
}