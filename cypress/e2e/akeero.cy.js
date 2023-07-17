describe('akeero', () => {

  const defaultTimeout = 3000

  beforeEach(() => {
    cy.task("db:drop", null, { timeout: defaultTimeout })
    // await cy.task("db:seed", {
    //   fixtureFile: "akeero",
    //   testName: "test1",
    // })

    cy.task("db:load-json", {
      jsonDir: "akeero-url-conversion",
    }, { timeout: defaultTimeout })

    cy.clearAllCookies()
    cy.window().then((win) => {
      win.console.clear()
    })


    cy.viewport(1000, 1200)

    cy.visit('https://demo.localhost')
  })


  it(`
    Visiting akeero once.
    Should record 1 view.
  `, () => {
    cy.wait(1000)

    cy.task("db:get", null, { timeout: defaultTimeout }).then(data => {
      expect(data?.variationViewsNum).to.equal(1)
    })
  })

  it(`
    Visiting akeero twice.
    Don't clear the view cookie.
    Should record 1 view.
  `, () => {

    cy.reload()
    cy.reload()

    cy.wait(1000)

    cy.task("db:get", null, { timeout: defaultTimeout }).then(data => {
      expect(data?.variationViewsNum).to.equal(1)
    })
  })


  it(`
    Visiting akeero twice.
    Clear all cookies.
    Should record 2 views.
  `, () => {

    cy.clearAllCookies()
    cy.reload()
    cy.wait(1000)

    cy.task("db:get", null, { timeout: defaultTimeout }).then(data => {
      expect(data?.variationViewsNum).to.equal(2)
    })

  })

  it(`
  Visiting akeero 3 times.
  Clear all cookies each time.
  Should record 3 views.
  `, () => {

    cy.clearAllCookies()
    cy.reload()
    cy.clearAllCookies()
    cy.reload()
    cy.wait(1000)


    cy.task("db:get", null, { timeout: defaultTimeout }).then(data => {
      expect(data?.variationViewsNum).to.equal(3)
    })
  })


  it(`
  Visiting akeero once.
  Go to conversion page.
  Should record 1 view.
  Should record 1 conversion.
`, () => {
    cy.visit("https://demo.localhost/conversion")
    cy.wait(1000)

    cy.task("db:get").then(data => {

      expect(data?.variationViewsNum).to.equal(1)
      expect(data?.variationConversionsNum).to.equal(1)
    })
  })
})
