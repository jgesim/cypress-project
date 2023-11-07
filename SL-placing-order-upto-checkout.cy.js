import {
  firstName,
  roomNumber,
  pin,
  revenue,
  ServiceOption,
  ServiceOptionTime,
  MessageToKitchen,
  menuName,
  BASE_URL_SL,
} from "../utils/constants";
describe("SeniorLiving", () => {
  it("Should place an order successfully ", () => {
    // Set a custom timeout for the test to avoid hanging (e.g., 60 seconds)
    Cypress.config("defaultCommandTimeout", 90000);
    cy.visit(BASE_URL_SL);
    cy.get('input[name="First Name"]').type(firstName);
    cy.get('input[name="room"]').type(roomNumber);
    cy.get('button[type="submit"]').eq(0).click();
    // Assertion: Check for a welcome message
    cy.contains("Welcome back! ").should("be.visible");
    cy.get('input[name="pinCode"]').type(pin);
    cy.get('button[type="submit"]').contains("LOGIN").click();
    cy.wait(3000);
    // Assertion: Check for a welcome message
    cy.contains("Good day " + firstName).should("be.visible");
    cy.wait(4000);
    cy.get("button").contains(revenue).should("be.visible").click();
    /*//enable this line if there is Menu item available
    cy.get("button").contains(menuName).should("be.visible").click();*/
    
    /*//ignore
     cy.get("div.d-flex").within(() => {
      cy.wait(9500);
      cy.get("button").then(($columns) => {
        const randomIndex = Math.floor(Math.random() * $columns.length);
        cy.wrap($columns[randomIndex]).click();
      });
    });*/
    cy.wait(9800);
    //Item selection
    cy.get("div.MuiPaper-root")
      .find("div")
      .then(($columns) => {
        const randomIndex = Math.floor(Math.random() * $columns.length);
        cy.wrap($columns[randomIndex]).click();
      });
    cy.wait(6000);
    cy.contains("div", "ADD TO CHECK").should("be.visible").click();
    cy.get("#iconLeft").should("be.visible").click();
    cy.contains("button", "Proceed To Checkout").should("be.visible").click();
    cy.get('input[name="message"]').type(MessageToKitchen);
    cy.get("div").contains(ServiceOption).should("be.visible").click();
    cy.contains("div", "Select...").should("be.visible").click();
    cy.wait(3000);
    cy.get("div").contains(ServiceOptionTime).should("be.visible").click();
    cy.contains("li", "Meal Credit").should("be.visible").click();
    cy.contains('button[type="submit"]', "Submit Order")
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains('button[type="submit"]', "Submit Order")
      .should("be.visible")
      .click();
    cy.wait(9000);
    //Assertion
    cy.contains("Good day " + firstName).should("be.visible");
    // Click the logout button with the SVG icon.
    //cy.get("[data-testid='LogoutTwoToneIcon']").click();
    // Add assertions to verify successful logout
    //cy.contains("Please log into your account").should("be.visible");
  });
});
