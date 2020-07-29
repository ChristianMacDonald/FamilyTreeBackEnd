
exports.up = async function(knex) {
    return knex.schema.createTable('family_trees', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('owner_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.string('name').notNullable();
        table.unique(['owner_id', 'name']);
    });
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('family_trees');
};
