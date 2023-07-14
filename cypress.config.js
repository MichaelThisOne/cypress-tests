const { defineConfig } = require("cypress")
const { MongoClient } = require("mongodb")

const connectionString = "mongodb+srv://gro-dev:vYBUGp6MNqkGVNfY@gro.d2su6ry.mongodb.net/thisone-dev?retryWrites=true&w=majority"
const dbName = "thisone-dev"

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        async 'db:drop'() {

          console.log(`Dropping database: ${dbName}`)
          const client = new MongoClient(connectionString, { useUnifiedTopology: true })

          try {
            await client.connect()
            const db = client.db(dbName)
            const companyCollection = db.collection("companies")
            const projectCollection = db.collection("projects")
            const variationCollection = db.collection("variations")
        
            await companyCollection.deleteMany({})
            await projectCollection.deleteMany({})
            await variationCollection.deleteMany({})
        
            console.log("Collections dropped")
          } catch (error) {
            console.log("Error adding record:", error)
          } finally {
            await client.close()
            return false
          }        

        },

        async 'db:seed'() {

          console.log(`Seeding database: ${dbName}`)
          const client = new MongoClient(connectionString, { useUnifiedTopology: true })

          try {
            await client.connect()
            const db = client.db(dbName)
            const companyCollection = db.collection("companies")
            const projectCollection = db.collection("projects")
            const conversionCollection = db.collection("conversions")
            const variationCollection = db.collection("variations")
        
            const companyData = { name: "Cypress Test Company", }
            const result = await companyCollection.insertOne(companyData)
            // const result = await project.insertOne(companyData)
            console.log(result)
        
            console.log("Record added:", result.insertedId)
          } catch (error) {
            console.log("Error adding record:", error)
          } finally {
            await client.close()
          }        

          return true
        },




      })
    },
  },
})
