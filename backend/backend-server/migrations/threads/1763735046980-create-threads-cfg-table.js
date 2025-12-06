exports.up = (knex) => {
  return knex.schema.createTable('thread_cfgs', (table) => {
    table.string('id').primary();
    table.string('name').notNullable().unique();
    table.binary('cfg').notNullable();
    table.timestamps(true, true);
  })
  .then(() => {
    return knex.raw(`
      CREATE INDEX idx_thread_cfgs_name ON thread_cfgs (name);
    `)
  });
}

exports.down = (knex) => {
  return knex.raw(
    'DROP INDEX idx_thread_cfgs_name;'
  )
  .then(() => knex.schema.dropTable('thread_cfgs'));
}