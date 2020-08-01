
exports.up = async function(knex) {
    return knex.schema.createTable('family_trees', table => {
        table.increments('id').primary();
        table.integer('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.string('name').notNullable();
    });
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('family_trees');
};
