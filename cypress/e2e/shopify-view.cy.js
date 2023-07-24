describe('akeero', () => {

  const defaultTimeout = 3000
  const headerOptions = ["Devs wanna dev.", "Header 1", "Header 2"];
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
    Visiting akeero once.
    Should record 1 view.
  `, () => {

    cy.visit('https://demo.localhost/shopify-landing-page.html')
    cy.get('[cypress-id="header"]').then(($element) => {
      const text = $element.text();
      expect(headerOptions).to.include(text)
    })
    cy.get('[cypress-id="subheader"]').then(($element) => {
      let text = $element.text()
      text = text.replace(/\s+/g, ' ')

      expect(subheaderOptions).to.include(text)
    })

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
    cy.visit('https://demo.localhost/shopify-landing-page.html')
    const headerOptions = ["Devs wanna dev.", "Header 1", "Header 2"];
    cy.get('[cypress-id="header"]').then(($element) => {
      const text = $element.text();
      expect(headerOptions).to.include(text)
    })

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
    cy.visit('https://demo.localhost/shopify-landing-page.html')
    const headerOptions = ["Devs wanna dev.", "Header 1", "Header 2"];
    cy.get('[cypress-id="header"]').then(($element) => {
      const text = $element.text();
      expect(headerOptions).to.include(text)
    })
    cy.get('[cypress-id="subheader"]').then(($element) => {
      let text = $element.text()
      text = text.replace(/\s+/g, ' ')

      expect(subheaderOptions).to.include(text)
    })

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
    cy.visit('https://demo.localhost/shopify-landing-page.html')
    const headerOptions = ["Devs wanna dev.", "Header 1", "Header 2"];
    cy.get('[cypress-id="header"]').then(($element) => {
      const text = $element.text();
      expect(headerOptions).to.include(text)
    })

    cy.clearAllCookies()
    cy.reload()
    cy.clearAllCookies()
    cy.reload()
    cy.wait(1000)


    cy.task("db:get", null, { timeout: defaultTimeout }).then(data => {
      expect(data?.variationViewsNum).to.equal(3)
    })
  })
})
