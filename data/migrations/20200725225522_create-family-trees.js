
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"');
    return knex.schema.createTable('family-trees', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('owner-id').references('id').inTable('users');
        table.string('name').notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('family-trees');
    return knex.raw('drop extension if exists "uuid-ossp"');
};
