    const { clear } = require('console');
    const {promises: fs} = require('fs');

   

    class Contendor{
        constructor (pathFile){
            this.pathFile = pathFile;
            
            
            
        }
        async save(obj){
            let data = null;
            let id= 0;
            let dataObj = [];
            
            try{
                data = await fs.readFile(this.pathFile,'utf-8')
                
            }catch(err){
                console.log(err)
            }
            if(data.length == 0){
                id = 1;
                data = [{...obj,id: id}]
                
                
            }else{
                dataObj = JSON.parse(data);
                
                id  = dataObj[dataObj.length-1].id+1;
            
                
            }
            const nObj = {id: id, ...obj};
            dataObj.push(nObj);
            
            
            fs.writeFile(this.pathFile,JSON.stringify(dataObj));
            console.log("se asigno el ID:"+id)
            
        }
        async getById(id){
            let data = null;
            let dataObj;
            
        
            try{
                data = await fs.readFile(this.pathFile,'utf-8')
                dataObj = JSON.parse(data);
            }catch(err){
                console.log(err)
            }
            const uno = dataObj.filter(usuario => usuario.id === id);
            if(uno == ""){
                console.log(null)
            }else{
                console.log(uno)
            }
        }
        async deleteById(id){
            let data = null;
            
            let dataObj= null
        
            try{
                data = await fs.readFile(this.pathFile,'utf-8')
                dataObj = JSON.parse(data);
            }catch(err){
                console.log(err)
            }
            const uno = dataObj.filter(usuario => usuario.id !== id);
            fs.writeFile(this.pathFile,JSON.stringify(uno));
            console.log("Se elimino el  objeto Numero:"+id)
        }
        async getAll(){
            let data = null;
            
            let dataObj = [];
        
            try{
                data = await fs.readFile(this.pathFile,'utf-8')
                dataObj = JSON.parse(data);
            }catch(err){
                return dataObj;
            }
            return dataObj
        }
        async deleteAll(){
        
            fs.writeFile(this.pathFile,"");
        }
    }


    

    const pathFile = new Contendor("Productos.txt")
    module.exports = Contendor;