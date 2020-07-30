
exports.up = function(knex) {
    return knex.schema.createTable('family_members', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('family_tree_id')
        .notNullable()
        .references('id')
        .inTable('family_trees')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('suffix');
        table.unique(['first_name', 'last_name', 'suffix']);
        table.integer('age').unsigned();
        table.string('gender');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('family_members');
};
