class RepositoryHostSQLite{

    constructor(dbPath, sqliteLib){
        // Should allow Memory? :memory:
        this.dbPath = dbPath;
        this.sqlite = sqliteLib;
        this.db = null;
    }

    open(){
        this.db = new this.sqlite.Database(this.dbPath);
        this.checkTable();
    }
    close(){
        if(this.db !== null)
        {
            this.db.close();
        }
    }

    checkTable(){
        this.db.get("SELECT * FROM HOST_DATA", [],(e) =>{
            if(e){
                this.db.run("CREATE TABLE HOST_DATA( uuid CHAR(36) PRIMARY KEY, mem INT, cpu INT, hostname VARCHAR2(100), date_time DATE DEFAULT CURRENT_DATE)");
            }
        });
    }
    add(hostData){
        if(this.db === null)
        {
            this.open()
        }
        this.db.serialize(() => {
          
            const stmt = this.db.prepare("INSERT INTO HOST_DATA VALUES ($uuid, $mem, $cpu, $hostname, $date)");
            stmt.run(
                { 
                    $uuid: hostData.uuid,
                    $mem : hostData.mem,
                    $cpu : hostData.cpu,
                    $hostname : hostData.hostname,
                    $date : hostData.date
                },
                (err) =>{
                    if(err){
                        console.log("ERROR ", err)
                    }


                }
            );
            stmt.finalize();
        });
    }

    get(){
        return new Promise( (resolve, reject) => {
            const prevDate = new Date() 
            prevDate.setMinutes(prevDate.getMinutes() - 30);
            this.db.all("SELECT * FROM HOST_DATA WHERE date_time >= ?", [prevDate.getTime()],(e,rows) =>{
                if(e){
                    console.log(e);
                    reject(e);
                }
                resolve(rows);
            });

        });
    }

    getByDate(dateStart){
        return new Promise( (resolve, reject) => {
            const next = new Date(dateStart.getTime()) 
            next.setMinutes(next.getMinutes() + 30);
            this.db.all("SELECT * FROM HOST_DATA WHERE date_time >= ? AND date_time <= ?", [dateStart, next],(e,rows) =>{
                if(e){
                    reject(e);
                }
                resolve(rows);
            });

        });
    }

    delete(hostId){
        this.db.serialize(function() {
            const stmt = this.db.prepare("DELETE FROM lorem WHERE uuid = (?)");
            stmt.run(hostId);
            
            stmt.finalize();
        });
    }

    edit(){}
}

module.exports = RepositoryHostSQLite;