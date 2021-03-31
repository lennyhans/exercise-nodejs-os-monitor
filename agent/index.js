const sqlite3 = require('sqlite3');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const AgentService = require('./agentService');
const AgentEmitter = require('./agentEmitter');
const RepositoryHost = require('../repositories/repositoryHost');
const RepositoryHostSQLite = require('../repositories/repositoryHostSQLite');

const repositoryHostSQLite = new RepositoryHostSQLite('../database.db', sqlite3);
const repositoryHost = new RepositoryHost(repositoryHostSQLite);

const agentEmitter = new AgentEmitter({ generate : () =>{ return uuidv4()} } );
const agentService = new AgentService( repositoryHost );
const TIMER_VAL = 30* 60 * 1000;
const interval = 1000; 

agentEmitter.once("connect", () => {
    console.log("Connecting to Repository...")
    agentService.connect();
});

agentEmitter.once("disconnect", () => {
    console.log("Disconnecting repository...")
    agentService.disconnect();
});

agentEmitter.on("addMetric", (hostData) => {
    console.log("Adding Metric %s...", hostData.uuid)
    agentService.addMetric(hostData);
});

agentEmitter.on("removeMetric", () => {
    agentService.removeMetric();
});

agentEmitter.on('error', (e) => {
    console.log("[ERR] Ops" , e);
});

agentEmitter.connect();

let timerCurrentVal = interval;

function sendData(_loop){
    agentEmitter.addMetric();
    //console.log("Sending data at time ", timerCurrentVal );
    // NEXT ITERATION
    timerCurrentVal+=interval;
    if(TIMER_VAL <= timerCurrentVal){
        clearInterval(_loop);
        agentEmitter.disconnect();
    }
}

console.log("INIT");

const loop = setInterval(() => {
    sendData(loop);
}, interval);