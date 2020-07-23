
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"');
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users');
    return knex.raw('drop extension if exists "uuid-ossp"');
};
