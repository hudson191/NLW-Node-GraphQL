const knex = require('../database/connection')

module.exports = {
    async excluirPoint(_,args){
        const {id} = args;

        const trx = await knex.transaction();

        await trx('point_items').where('point_id',id).delete();
        await trx('points').where('id',id).delete();

        trx.commit();

        return {
            code: '001',
            message: "Registro deletado com sucesso"
        }

    },
    async novoPoint(_,args){
        console.log("Inicio");
        const{
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = args

        const trx = await knex.transaction();
        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertIds = await trx('points').insert(point);
        const point_id = insertIds[0];
        
        const pointItems = items.map((item_id) =>{
            return {
                item_id,
                point_id:point_id
            }
        });
    
        await trx('point_items').insert(pointItems);
    
        trx.commit();

        return { 
            id: point_id,
            ... point,
            items: items
        }
    }
}