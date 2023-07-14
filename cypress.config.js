const { defineConfig } = require("cypress")
const { MongoClient } = require("mongodb")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        async 'db:drop'() {

          const connectionString = "mongodb+srv://gro-dev:vYBUGp6MNqkGVNfY@gro.d2su6ry.mongodb.net/thisone-dev?retryWrites=true&w=majority"
          const dbName = "thisone-dev"

          console.log(`Dropping database: ${dbName}`)
          const client = new MongoClient(connectionString, { useUnifiedTopology: true })

          try {
            await client.connect()
            const adminDb = client.db("admin")
            const dropDbCommand = { dropDatabase: 1 }
            await adminDb.command(dropDbCommand)
            console.log(`Database ${dbName} dropped successfully!`)
          } catch (error) {
            console.log(`Error dropping database: ${error}`)
          } finally {
            await client.close()
          }

          return true
        },
        async 'db:seed'() {

          // const connectionString = "mongodb+srv://gro-dev:vYBUGp6MNqkGVNfY@gro.d2su6ry.mongodb.net/thisone-dev?retryWrites=true&w=majority"
          // const dbName = "thisone-dev"

          // console.log(`Dropping database: ${dbName}`)
          // const client = new MongoClient(connectionString, { useUnifiedTopology: true })

          // try {
          //   await client.connect()
          //   const adminDb = client.db("admin")
          //   const dropDbCommand = { dropDatabase: 1 }
          //   await adminDb.command(dropDbCommand)
          //   console.log(`Database ${dbName} dropped successfully!`)
          // } catch (error) {
          //   console.log(`Error dropping database: ${error}`)
          // } finally {
          //   await client.close()
          // }

          return true
        },




      })
    },
  },
})
