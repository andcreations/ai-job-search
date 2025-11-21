exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  })
  .then(() => {
    return knex.raw(`
      CREATE INDEX idx_users_username ON users (username);
    `)
  });
}

exports.down = (knex) => {
  return knex.raw(
    'DROP INDEX idx_users_username;'
  )
  .then(() => knex.schema.dropTable('users'));
}