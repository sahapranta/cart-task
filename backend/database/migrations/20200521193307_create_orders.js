exports.up = function(knex) {
  return knex.schema.createTable("orders", table => {
    table.increments();
    table.string("address").notNullable();
    table.integer("amount").notNullable();
    table.text("products").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
};
