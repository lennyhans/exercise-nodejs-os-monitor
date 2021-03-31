const StaticData = [];
class RepositoryHostStatic{

    open(){
        return;
    }
    close(){
        return;
    }

    add(hostData){
        if(StaticData.filter( e => { return e.uuid === hostData.uuid }) > 0){
            return null;
        }
        StaticData.push(hostData);
    }

    get(){

    }

    delete(hostId){
        let indexToDelete = -1;
        StaticData.map( (e,i) => {
            if(indexToDelete !== -1)
            {
                return;
            }
            if(e.uuid == hostId){
                indexToDelete = i;
            }
        })

        if(indexToDelete !== -1){
            StaticData.splice(indexToDelete,1);
        }
    }

    edit(){}
}

module.exports = RepositoryHostStatic;