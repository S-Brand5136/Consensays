beforeEach(() => {
  cy.visit("http://localhost:3000/");
});

describe("index.js", () => {
  it("should load the page with an empty poll form", () => {
    // check background
    cy.get("main").should(
      "have.css",
      "background",
      `url("null") 50% 50% / cover no-repeat`
    );

    // check form inputs
    cy.get("#poll-title").should("have.value", "Poll Title");

    // check save button is disabled
    cy.get("#save-btn").should("have.css", "cursor", "not-allowed");
  });

  it("should change the background when a new one is chosen", () => {
    // get background button
    const bgBtn = cy.get("button").contains("Background");

    bgBtn.click();

    // wait for image options to be on sceen
    cy.get(`[alt='trianglify-1']`);

    // make sure slide is working correctly
    cy.get("div.chakra-slide").should(
      "have.css",
      "transform",
      "matrix(1, 0, 0, 1, 0, 0)"
    );

    // click second slide option
    cy.get(`[alt='trianglify-1']`).parent().click();

    // check background has changed
    cy.get("main").should(
      "have.css",
      "background",
      `url("/backgrounds/trianglify-1.png") 50% 50% / cover no-repeat`
    );

    // check that clicking main closes slide
    cy.get("main").click(15, 40);

    cy.get("div.chakra-slide").should(
      "not.have.css",
      "transform",
      "matrix(1, 0, 0, 1, 0, 0)"
    );
  });

  it("should add new options when the button is clicked", () => {
    const optionsContainer = cy.get("#options-container");
    const btn = cy.get("#option-btn");

    // add new options
    optionsContainer.children().should("have.length", 2);

    btn.click();
    btn.click();

    optionsContainer.children().should("have.length", 4);

    // check save button is disabled
    cy.get("#save-btn").should("have.css", "cursor", "not-allowed");
  });

  it("should enable save button after inputs have value", () => {
    const saveBtn = cy.get("#save-btn");
    const optionsContainer = cy.get("#options-container");

    // check save button is disabled
    cy.get("#save-btn").should("have.css", "cursor", "not-allowed");

    // tpye into each input
    optionsContainer.children().each(($child) => {
      cy.wrap($child).type("asdasd");
    });

    optionsContainer.children().each(($child) => {
      cy.wrap($child).should("have.value", "asdasd");
    });

    // check and click save button
    cy.wait(1250);

    saveBtn.click();

    // check it loaded correctly
    cy.get("h2").contains("Poll Title");
  });
});
