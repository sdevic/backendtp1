const fs = require('fs');
const knex = require('knex')

class ContenedorChat {
    constructor(name, options){
        this.knex = knex(options)
        this.name = name
    }

    crearTabla() {
        return this.knex.schema.dropTableIfExists(this.name)
            .finally(() => {
                return this.knex.schema.createTable(this.name, table => {
                    table.increments('id').primary()
                    table.string('author', 50).notNullable()
                    table.string('text', 250).notNullable()
                    table.string('date',250).notNullable();
                })
            })
    }
    async save(message){
        
        return this.knex(this.name).insert(message)
    }

    async getAll(){
        return this.knex(this.name).select('*')

    }
}

module.exports = ContenedorChat;