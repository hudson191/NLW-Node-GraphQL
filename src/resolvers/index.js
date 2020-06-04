
const knex = require('../database/connection')

module.exports = {
    Items:{
        image_url(items){
            return `http://localhost:3333/${items.image}`;
        }
    },
    Points:{
        image_url(points){
            return `http://localhost:3333/${points.image}`;
        },
        async items(points){
            const items = await knex('items')
            .join('point_items','items.id','=','point_items.item_id')
            .where('point_items.point_id',points.id);
            return items
        }
    },
    Query: {
        async items(){
            const items =  await knex('items').select('*');
            return items;
        },
        async points(){
            const points =  await knex('points').select('*');
            return points;
        },
        async point(_,args){
            const point =  await knex('points').where('id',args.id).select('*').first();
            if(point){
                return point;
            }
            return null;

        }
    }
} 