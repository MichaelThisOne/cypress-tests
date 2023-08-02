describe('akeero', () => {

  const defaultTimeout = 3000
  const headerOptions = ["Devs wanna dev.", "Header 1", "Header 2"]
  const subheaderOptions = [
    "You didn’t become a coder to spend your time setting everything up. Our lo-config code is 10x faster, safer, and works out of the box.",
    "Subheader 1",
    "Subheader 2",
  ]

  beforeEach(() => {
    cy.task("db:drop", null, { timeout: defaultTimeout })
    // await cy.task("db:seed", {
    //   fixtureFile: "akeero",
    //   testName: "test1",
    // })

    cy.task("db:load-json", {
      jsonDir: "akeero-shopify-conversion",
    }, { timeout: defaultTimeout })

    cy.clearAllCookies()
    cy.window().then((win) => {
      win.console.clear()
    })

    cy.viewport(1000, 1200)

  })

  it(`
  Requesting the snippet 100 times.
  Snippet delivery should not take more than 300ms in all 100 requests
  `, () => {

    for (let i = 0; i < 100; i++) {
      cy.request({
        method: 'GET',
        url: 'https://backend-ai.localhost/projects/64b5481b2fd32342c0a00dd0/shopify?variationId=',
        timeout: 1000, //always less than a second
      }).then((result) => {
        expect(result.duration).to.be.lessThan(300);
      })
    }

  })

})
