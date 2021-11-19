const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://postgres:postgres@localhost/manytomany"
});

client.connect();

module.exports = client;