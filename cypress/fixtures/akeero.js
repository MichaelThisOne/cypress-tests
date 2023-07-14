
const fixtures = {
    test1: {
        companies: [
            {
                dbRecord: { name: "Cypress Test Company" },
                projects: [
                    {
                        dbRecord: {
                            landingPageUrl: "https://demo-akeero.letsgro.ai",
                            isActive: true,
                            suggestions: [], // hardcoded to avoid putting the worker to fetch suggestions
                        },
                        variations: [
                            {
                                dbRecord: {
                                    "json": [
                                        {
                                            "textContent": "Devs wanna dev.",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h1",
                                            "originalContent": "Devs wanna dev.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h1"
                                        },
                                        {
                                            "textContent": "You didn’t become a coder to spend your time setting everything up. Our\n            lo-config code is 10x faster, safer, and works out\n            of the box.",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h2",
                                            "originalContent": "You didn’t become a coder to spend your time setting everything up. Our\n            lo-config code is 10x faster, safer, and works out\n            of the box.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h2"
                                        }
                                    ],
                                    type: "baseline",
                                    "tags": [],
                                }
                            },
                            {
                                dbRecord: {
                                    "json": [
                                        {
                                            "textContent": "Devs wanna dev.",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h1",
                                            "originalContent": "Devs wanna dev.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h1"
                                        },
                                        {
                                            "textContent": "You didn’t become a coder to spend your time setting everything up. Our\n            lo-config code is 10x faster, safer, and works out\n            of the box.",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h2",
                                            "originalContent": "You didn’t become a coder to spend your time setting everything up. Our\n            lo-config code is 10x faster, safer, and works out\n            of the box.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h2"
                                        }
                                    ],
                                    type: "anomaly",
                                    "tags": [],
                                }
                            },
                            {
                                dbRecord: {
                                    "json": [
                                        {
                                            "textContent": "Header 1",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h1",
                                            "originalContent": "Devs wanna dev.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h1"
                                        },
                                        {
                                            "textContent": "Subheader 1",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h2",
                                            "originalContent": "You didn’t become a coder to spend your time setting everything up. Our\n            lo-config code is 10x faster, safer, and works out\n            of the box.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h2"
                                        }
                                    ],
                                    "tags": [],
                                }
                            },
                            {
                                dbRecord: {
                                    "json": [
                                        {
                                            "textContent": "Header 2",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h1",
                                            "originalContent": "Devs wanna dev.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h1"
                                        },
                                        {
                                            "textContent": "Subheader 2",
                                            "convertedCssSelector": "html > body > div:nth-child(4) > div > div:nth-child(2) > div > h2",
                                            "originalContent": "You didn’t become a coder to spend your time setting everything up. Our\n            lo-config code is 10x faster, safer, and works out\n            of the box.",
                                            "xpath": "/html/body/div[4]/div/div[2]/div/h2"
                                        }
                                    ],
                                    "tags": [],
                                }
                            },

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