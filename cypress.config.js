const { defineConfig } = require("cypress")
const { MongoClient } = require("mongodb")
const {
  createCompany,
} = require("./lib/mongo")

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
            const conversionCollection = db.collection("conversions")
            const variationViewCollection = db.collection("variation-views")
            const variationConversionCollection = db.collection("variation-conversions")

            await companyCollection.deleteMany({})
            await projectCollection.deleteMany({})
            await variationCollection.deleteMany({})
            await conversionCollection.deleteMany({})
            await variationViewCollection.deleteMany({})
            await variationConversionCollection.deleteMany({})

            console.log("Collections dropped")
          } catch (error) {
            console.log("Error adding record:", error)
          } finally {
            await client.close()
            return false
          }

        },

        async 'db:seed'({ fixtureFile, testName }) {

          const data = require(`./cypress/fixtures/${fixtureFile}.js`)
          const test = data?.[testName]

          if (!test) {
            console.log(`No ${testName} test found in cypress/fixtures/${fixtureFile}`)
            return
          }

          console.log(`Seeding database: ${dbName}`)
          const client = new MongoClient(connectionString, { useUnifiedTopology: true })

          try {
            await client.connect()
            const db = client.db(dbName)

            if (test?.companies) {
              for (let company of test.companies) {
                await createCompany(company, db)
              }
            }

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
