// const { MongoClient } = require("mongodb")

// const connectionString = "mongodb+srv://gro-dev:vYBUGp6MNqkGVNfY@gro.d2su6ry.mongodb.net/thisone-dev?retryWrites=true&w=majority"
// const dbName = "thisone-dev"

// Cypress.Commands.add("dropDatabase", async () => {
//   cy.log(`Dropping database: ${dbName}`);

//   const client = new MongoClient(connectionString, { useUnifiedTopology: true });

//   try {
//     await client.connect();
//     const adminDb = client.db("admin");
//     const dropDbCommand = { dropDatabase: 1 };
//     await adminDb.command(dropDbCommand);
//     cy.log(`Database ${dbName} dropped successfully!`);
//   } catch (error) {
//     cy.log(`Error dropping database: ${error}`);
//   } finally {
//     await client.close();
//   }
// });
