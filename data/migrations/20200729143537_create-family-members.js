
exports.up = function(knex) {
    return knex.schema.createTable('family-members', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('family_tree_id')
        .references('id')
        .inTable('family_trees')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        
        table.string('name');
        table.integer('age').unsigned();
        table.string('gender');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('family-members');
};
