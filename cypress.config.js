const { defineConfig } = require("cypress")
const { MongoClient, ObjectId } = require('mongodb')
const {
  createCompany,
} = require("./lib/mongo")
const fs = require("fs")

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

        async 'db:load-json'({ jsonDir, }) {

          const url = 'mongodb+srv://gro-dev:vYBUGp6MNqkGVNfY@gro.d2su6ry.mongodb.net/thisone-dev?retryWrites=true&w=majority'
          const dbName = 'thisone-dev'
          const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
          const collections = ['companies', 'projects', 'variations', 'conversions']

          const convertIds = (data) => {
            return data.map(item => {
              if (item._id && item._id.$oid) {
                item._id = new ObjectId(item._id.$oid)
              }
              return item
            })
          }

          try {
            // Connect the client to the server
            await client.connect()
            console.log("Connected successfully to server")
            const db = client.db(dbName)

            for (let collectionName of collections) {

              const filePath = `./db_dump/${jsonDir}/${collectionName}.json`
              const rawData = fs.readFileSync(filePath, 'utf8')
              const lines = rawData.split('\n').filter(line => line)
              let data = lines.map(line => JSON.parse(line))

              // Convert any $oid strings into ObjectId instances
              data = convertIds(data)

              // Insert JSON data into the respective collection
              const collection = db.collection(collectionName)
              const result = await collection.insertMany(data)
              console.log(`${result.insertedCount} documents were inserted into ${collectionName}`)
            }
          }
          catch (e) {
            console.log(e)
          }
          finally {
            // Ensures that the client will close when you finish/error
            await client.close()
          }

          return true
        },




      })
    },
  },
})
