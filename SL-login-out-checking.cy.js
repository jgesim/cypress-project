import {firstName, roomNumber, pin, BASE_URL_SL } from '../utils/constants';
describe("SeniorLiving", () => {
  it("should Login and Logout Successfully", () => {
    // Set a custom timeout for the test to avoid hanging (e.g., 60 seconds)
    Cypress.config("defaultCommandTimeout", 90000);
    cy.visit(BASE_URL_SL);
    // Replace with actual data
    //const firstName = "Test";
    //const roomNumber = "S123";
    //const pin = "1234";

    // Fill in the login form with valid credentials
    cy.get('input[name="First Name"]').type(firstName);
    cy.get('input[name="room"]').type(roomNumber);
    cy.get('button[type="submit"]').eq(0).click();

    // Assertion: Check for a welcome message after the initial login
    cy.contains("Welcome back! ").should("be.visible");

    // Enter the PIN and click the LOGIN button
    cy.get('input[name="pinCode"]').type(pin);
    cy.get('button[type="submit"]').contains("LOGIN").click();

    // Assertion: Check for a welcome message after successful login
    cy.contains("Good day " + firstName).should("be.visible");

    // Wait for a few seconds (you can adjust the wait time)
    cy.wait(3000);

    // Click the logout button with the SVG icon.
    cy.get("[data-testid='LogoutTwoToneIcon']").click();

    // Assertion to verify successful logout and the login page is displayed again
    cy.contains("Please log into your account").should("be.visible");

    


  });
});
