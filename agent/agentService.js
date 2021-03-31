const os = require('os');

class AgentService {
    constructor(repository) {
        
        this.repository = repository;
        this.lastTimes = os.cpus();
        this.totalMem = os.totalmem();
    }

    connect(){
        this.repository.open();
    }

    disconnect(){
        this.repository.close();
    }

    getCPUInfo(){
        const cpus = os.cpus();
        let cpusSummary = 0
        for(let i = 0; i < this.lastTimes.length; i++){
            let c = cpus[i];
            let old = this.lastTimes[i];
            let idle = c.times.idle - old.times.idle;
            let difference = c.times.user + c.times.nice + c.times.sys + c.times.idle - 
              (old.times.user + old.times.nice + old.times.sys + old.times.idle);
            let averageLoad = 100 - (idle / difference * 100)
            //console.log("Average Load per core :", averageLoad )
            cpusSummary += averageLoad; // * 1/this.lastTimes.length;
        }

        //console.log("AVERAGE ON ALL CORES: ", cpusSummary);
        return (cpusSummary / this.lastTimes.length).toFixed(2);

    }

    addMetric(hostData){
        if(hostData === null){
            return null;
        }

        hostData.mem = (100 - (os.freemem() / this.totalMem *100)).toFixed(2) ;
        
        hostData.cpu = this.getCPUInfo(); //Percentage
        hostData.hostname = os.hostname();

        this.lastTimes = os.cpus();
        return this.repository.add(hostData);

    }

    removeMetric(hostData){
        return this.repository.delete(hostData.uuid);
    }
}

module.exports = AgentService;