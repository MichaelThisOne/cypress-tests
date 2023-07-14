
const fixtures = {
    test1: {
        companies: [
            {
                dbRecord: { name: "Cypress Test Company" },
                projects: [
                    {
                        dbRecord: {
                            landingPageUrl: "https://demo.localhost",
                            suggestions: [], // hardcoded to avoid putting the worker to fetch suggestions
                        },
                        variations: [
                            {
                                dbRecord: {
                                    json: {},
                                },
                            }
                        ],
                        conversions: [
                            {
                                dbRecord: {
                                    type: "url",
                                    target: "/conversion",
                                }
                            },
                        ],
                    },
                ],
            },
        ],
    },
}

module.exports = fixtures