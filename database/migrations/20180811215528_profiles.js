
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', (table) => {
    table.string('id', 36).unsigned().primary()
    table.string('first_name', 50).notNullable()
    table.string('middle_name', 50).nullable()
    table.string('last_name', 50).nullable()
    table.timestamp('birth_date').nullable()
    table.string('email', 50).nullable()
    table.string('mobile', 12).nullable()
    table.string('nation_no').nullable()
    table.string('address_1', 100).nullable()
    table.string('address_2', 100).nullable()
    table.string('address_3', 100).nullable()
    table.string('zip_code', 10).nullable()
    table.string('country_code', 5).nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('created_by').nullable()
    table.timestamp('updated_at').nullable()
    table.string('updated_by').nullable()
    table.foreign('id').references('users.id')  
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles')
};
