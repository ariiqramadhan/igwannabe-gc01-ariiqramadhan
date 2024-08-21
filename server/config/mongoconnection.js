const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
    } catch (err) {
        await client.close();
        throw err;
    }
}

async function getDB() {
    return client.db('gc01');
}

module.exports = {
    connect,
    getDB
}