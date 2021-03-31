const EventEmitter = require("events");

class AgentEmitter extends EventEmitter {
    constructor(uuidManager) {
        super();
        this.uuidManager = uuidManager;
    }

    connect(){
        this.emit("connect");
    }

    disconnect(){
        this.emit("disconnect");
    }

    addMetric(hostData){
        if(hostData === undefined || hostData === null)
        {
            hostData = {}
        }
        hostData.uuid = this.uuidManager.generate();
        hostData.date = Date.now()
        this.emit("addMetric", hostData );

    }

    removeMetric(hostData){
        this.emit("removeMetric", hostData);
    }
}

module.exports =  AgentEmitter;