
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.string('id', 36).unique().primary()
    table.string('username').unique().notNullable()
    table.string('email', 50).unique().notNullable()
    table.string('mobile', 12).nullable()
    table.string('password', 100).notNullable()
    table.boolean('hv_admin').notNullable().defaultTo(false)
    table.boolean('is_system').notNullable().defaultTo(false)
    table.boolean('is_active').notNullable().defaultTo(false)
    table.boolean('is_deleted').notNullable().defaultTo(false)
    table.string('activation_code', 6).nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('created_by').nullable()
    table.timestamp('updated_at').nullable()
    table.string('updated_by').nullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
