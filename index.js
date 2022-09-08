const { Intents } = require('discord.js')
const Client = require('./src/structures/Client')
const config = require('./config.json')
const Cluster = require('discord-hybrid-sharding');
const intents = new Intents(32767)


const client = new Client({
    shards: Cluster.data.SHARD_LIST, // An array of shards that will get spawned
    shardCount: Cluster.data.TOTAL_SHARDS,
    intents
})

client.cluster = new Cluster.Client(client);
client.login(config.TOKEN_CANARY)


const cfonts = require('cfonts');


process.on('unhandledRejection', (reason, p) => {
        console.log(' [ ANTICLASH ] | SCRIPT REJEITADO');
        console.log(reason, p);
    });

process.on("uncaughtException", (err, origin) => {
        console.log(' [ ANTICLASH] | CATCH ERROR');
        console.log(err, origin);
    }) 

process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [ ANTICLASH ] | BLOQUEADO');
        console.log(err, origin);
    });

process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [ ANTICLASH ] | VÁRIOS ERROS');
        console.log(type, promise, reason);
    });

exports.client = client

