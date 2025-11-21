exports.up = (knex) => {
  return knex.schema.createTable('threads', (table) => {
    table.string('id').primary();
    table.string('user_id').notNullable();
    table.timestamps(true, true);
  });
}

exports.down = (knex) => {
  return knex.schema.dropTable('threads');
}