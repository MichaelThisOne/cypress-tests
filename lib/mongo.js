const createVariation = async (variation, projectId, db) => {
    if (!variation.dbRecord) return

    const variationCollection = db.collection("variations")


    const insertRes = await variationCollection.insertOne({ projectId, ...variation.dbRecord })
    if (variation?.variationViews) {
        for (let variationView of project.variationViews) {
            await createVariationView(variationView, insertRes.insertedId, db)
        }
    }
    if (variation?.variationConversions) {
        for (let variationConversion of project.variationConversions) {
            await createVariationConversion(variationConversion, insertRes.insertedId,db)
        }
    }
}

const createVariationView = async (variationView, variationId, db) => {
    if (!variationView.dbRecord) return

    const variationViewCollection = db.collection("variation-views")


    await variationViewCollection.insertOne({ variationId, ...variationView.dbRecord })
}
const createVariationConversion = async (variationConversion, variationId, db) => {
    if (!variationConversion.dbRecord) return

    const variationConversionCollection = db.collection("variation-conversions")

    await variationConversionCollection.insertOne({ variationId, ...variationConversion.dbRecord })
}

const createProject = async (project, companyId, db) => {
    if (!project.dbRecord) return

    const projectCollection = db.collection("projects")

    const insertRes = await projectCollection.insertOne({ companyId, ...project.dbRecord })
    if (project?.variations) {
        for (let variation of project.variations) {
            await createVariation(variation, insertRes.insertedId, db)
        }
    }
    if (project?.conversions) {
        for (let conversion of project.conversions) {
            await createConversion(conversion, insertRes.insertedId, db)
        }
    }
}

const createConversion = async (conversion, projectId, db) => {
    if (!conversion?.dbRecord) return

    const conversionCollection = db.collection("conversions")
    await conversionCollection.insertOne({ projectId, ...conversion.dbRecord })
}

const createCompany = async (company, db) => {
    if (!company?.dbRecord) return

    const companyCollection = db.collection("companies")

    const insertRes = await companyCollection.insertOne(company.dbRecord)
    if (company?.projects) {
        for (let project of company.projects) {
            await createProject(project, insertRes.insertedId, db)
        }
    }
}

module.exports = {
    createCompany,
    createProject,
    createConversion,
    createVariation,
    createVariationConversion,
    createVariationView,
}