
exports.up = function(knex) {
  return knex.schema.createTable('hobbits', table => {
      table.increments();
      table.text('name', 128).notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('hobbits');
};
