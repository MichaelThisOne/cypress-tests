const { defineConfig } = require("cypress")
const { MongoClient, ObjectId } = require('mongodb')
const {
  createCompany,
} = require("./lib/mongo")
const fs = require("fs")

const connectionString = "mongodb+srv://gro-local:v9J975haSBboZv66@gro.d2su6ry.mongodb.net/gro-local?retryWrites=true&w=majority"
const dbName = "gro-local"


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      let client = null

      const connect = async () => {
        client = new MongoClient(connectionString, { useUnifiedTopology: true })

        try {
          await client.connect()

          console.log("Connected")
          return true
        } catch (error) {
          console.log("Error when connecting:", error)
          return undefined
        }
      }

      on('task', {

        async 'db:drop'() {
          if (!client) {
            await connect()
          }
          console.log(`Dropping database: ${dbName}`)
          try {
            const db = client.db(dbName)

            const companyCollection = db.collection("companies")
            const projectCollection = db.collection("projects")
            const variationCollection = db.collection("variations")
            const conversionCollection = db.collection("conversions")
            const variationViewCollection = db.collection("variation-views")
            const variationConversionCollection = db.collection("variation-conversions")
            const experimentCollection = db.collection("experiments")

            await companyCollection.deleteMany({})
            await projectCollection.deleteMany({})
            await variationCollection.deleteMany({})
            await conversionCollection.deleteMany({})
            await variationViewCollection.deleteMany({})
            await variationConversionCollection.deleteMany({})
            await experimentCollection.deleteMany({})

            return true
          } catch (error) {
            console.log("Error adding record:", error)
            return undefined
          }
        },

        async 'db:get'() {
          if (!client) {
            await connect()
          }
          try {
            const db = client.db(dbName)
            const VariationView = db.collection("variation-views")
            const VariationConversion = db.collection("variation-conversions")

            const variationViewsNum = await VariationView.countDocuments()
            const variationConversionsNum = await VariationConversion.countDocuments()
            const variationViews = await VariationView.find({}, { variationId: 1 }).toArray()
            const variationConversions = await VariationConversion.find({}, { variationId: 1 }).toArray()
            
            return { variationViewsNum, variationConversionsNum, variationConversions, variationViews }
          } catch (error) {
            console.log("Error retrieving database information:", error)
            return undefined
          }
        },

        async 'db:load-json'({ jsonDir, }) {

          if (!client) {
            await connect()
          }
          const dbName = 'gro-local'
          const collections = ['companies', 'projects', 'variations', 'conversions', 'experiments']

          const convertIds = (data) => {
            return data.map(item => {
              for (key of Object.keys(item)) {
                if (item?.[key]?.$oid) {
                  item[key] = new ObjectId(item[key].$oid)
                }
              }

              return item
            })
          }

          try {
            console.log("Connected successfully to server")
            const db = client.db(dbName)

            for (let collectionName of collections) {

              const filePath = `./db_dump/${jsonDir}/${collectionName}.json`
              const fileContent = fs.readFileSync(filePath, 'utf8')
              let data = JSON.parse(fileContent)
              // Convert any $oid strings into ObjectId instances
              data = convertIds(data)

              // Insert JSON data into the respective collection
              const collection = db.collection(collectionName)
              const result = await collection.insertMany(data)
              console.log(`${result.insertedCount} documents were inserted into ${collectionName}`)
            }
            return true
          }
          catch (e) {
            console.log(e)
            return undefined
          }
        },

        // async 'db:seed'({ fixtureFile, testName }) {

        //   const data = require(`./cypress/fixtures/${fixtureFile}.js`)
        //   const test = data?.[testName]

        //   if (!test) {
        //     console.log(`No ${testName} test found in cypress/fixtures/${fixtureFile}`)
        //     return
        //   }

        //   console.log(`Seeding database: ${dbName}`)

        //   try {
        //     const db = client.db(dbName)

        //     if (test?.companies) {
        //       for (let company of test.companies) {
        //         await createCompany(company, db)
        //       }
        //     }

        //   } catch (error) {
        //     console.log("Error adding record:", error)
        //   }
        // },

        // async 'db:get-variation-views'() {
        //   if (!client) {
        //     await connect()
        //   }
        //   try {
        //     const db = client.db(dbName)
        //     const variationViews = db.collection("variation-views")
        //     const variationViewsNum = await variationViews.countDocuments()
        //     console.log({ variationViewsNum })
        //     return variationViewsNum

        //   } catch (error) {
        //     console.log("Error retrieving variation views:", error)
        //     return undefined
        //   }
        // },

      })
    },
  },
  chromeWebSecurity: false
})
