
exports.up = function(knex) {
    return knex.schema.createTable('family_members', table => {
        table.increments('id').primary();
        table.integer('family_tree_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('family_trees')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.integer('mother_id')
        .unsigned()
        .references('id')
        .inTable('family_members')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.integer('father_id')
        .unsigned()
        .references('id')
        .inTable('family_members')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.string('first_name');
        table.string('last_name');
        table.string('suffix');
        table.integer('age').unsigned();
        table.string('gender');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('family_members');
};
