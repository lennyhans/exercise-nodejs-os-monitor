class RepositoryHost{

    constructor(repositoryImplementation){
        this.repository = repositoryImplementation;
    }
    open(){
        return this.repository.open();
    }
    close(){
        return this.repository.close();
    }

    add(hostData){
        return this.repository.add(hostData);
    }

    get(){
        return this.repository.get();
    }

    getByDate(dateStart){
        return this.repository.getByDate(dateStart);
    }

    delete(hostId){
        return this.repository.delete(hostId)
    }

    edit(){}
}

module.exports = RepositoryHost;