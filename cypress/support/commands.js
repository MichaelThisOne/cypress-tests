// const { MongoClient } = require("mongodb")

// const connectionString = "mongodb+srv://gro-local:v9J975haSBboZv66@gro.d2su6ry.mongodb.net/gro-local?retryWrites=true&w=majority"
// const dbName = "gro-local"

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
