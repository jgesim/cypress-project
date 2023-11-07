const registrationData = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe123',
  password: 'YourPassword',
};

describe('Gmail Registration', () => {
  const {
    firstName,
    lastName,
    username,
    password
  } = registrationData;

  const visitGmailRegistrationPage = () => {
    cy.visit('https://accounts.google.com/signup');
  };

  const fillRegistrationForm = () => {
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="Username"]').type(username);
    cy.get('input[name="Passwd"]').type(password);
    cy.get('input[name="ConfirmPasswd"]').type(password);
    cy.get('div[role="button"]').contains('Next').click();
  };

  beforeEach(() => {
    visitGmailRegistrationPage();
  });

  it('Fills out the registration form', () => {
    fillRegistrationForm();

    // Perform other actions as necessary to complete the registration

    // Assertions to verify successful registration
    cy.url().should('eq', 'https://mail.google.com/mail/u/0/#inbox');
    cy.get('div[role="alert"]').should('contain', 'Welcome to Gmail');
  });

  it('Validates form fields', () => {
    visitGmailRegistrationPage();

    // Add validations for form fields
    cy.get('input[name="firstName"]').should('have.value', firstName);
    cy.get('input[name="lastName"]').should('have.value', lastName);
    cy.get('input[name="Username"]').should('have.value', username);
    // Add more validations as needed
  });
});