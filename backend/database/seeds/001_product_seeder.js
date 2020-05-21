const faker = require("faker");

const createFakeProducts = id => ({
  id,
  name: faker.commerce.productName(),
  price: faker.random.number(400),
  description: faker.lorem.sentence(),
  quantity: faker.random.number(30),
  image: faker.image.image()
});

exports.seed = async function(knex) {
  const fakeProducts = [];
  const desiredProducts = 15;

  for (let i = 0; i <= desiredProducts; i++) {
    fakeProducts.push(createFakeProducts(i));
  }

  // Deletes ALL existing entries
  return await knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert(fakeProducts);
    });
};
