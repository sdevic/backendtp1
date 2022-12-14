const fs = require('fs');
const knex = require('knex')
class Contenedor {

    constructor(name, options){
        this.knex = knex(options)
        this.name = name
    }
    crearTabla() {
        return this.knex.schema.dropTableIfExists(this.name)
            .finally(() => {
                return this.knex.schema.createTable(this.name, table => {
                    table.increments('id').primary()
                    table.string('title', 50).notNullable()
                    table.string('thumbnail', 250).notNullable()
                    table.float('price')
                })
            })
    }
    async save(product){
        
        return this.knex(this.name).insert(product)
    }

   

    async getAll(){

        return this.knex(this.name).select('*')

    }

      
    
}

module.exports = Contenedor;