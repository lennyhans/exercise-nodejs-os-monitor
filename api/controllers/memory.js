class MemoryController {

    constructor(repositoryHost){
        this.repository = repositoryHost;
    }

    async get(dateStart){
        //console.log(dateStart);
        let possibleDate = null;
        if(dateStart !== undefined && dateStart !== null){
            possibleDate = new Date(Date.parse(dateStart));
        }
        //console.log(possibleDate.toString())
        if(possibleDate !== null)
            return await this.repository.getByDate(possibleDate);
        
        return await this.repository.get();
    }
}

module.exports = MemoryController;