describe('NewRegistration Page', () => {
  beforeEach(() => {
    cy.visit('#/new-registration');

    cy.intercept('POST', '/registrations', {
      statusCode: 201,
      body: {
        id: '2',
        employeeName: 'Jane Doe',
        email: 'jane.doe@example.com',
        cpf: '44764335026',
        admissionDate: '2021-01-01',
        status: 'REVIEW',
      },
    }).as('createRegistration');
  });

  it('should render the new registration form', () => {
    cy.contains('Nome').should('be.visible');
    cy.contains('Email').should('be.visible');
    cy.contains('CPF').should('be.visible');
    cy.contains('Data de admissão').should('be.visible');
  });

  it('should navigate back to the dashboard', () => {
    cy.get('button[aria-label="back"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should validate form fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Nome obrigatório').should('be.visible');
    cy.contains('Email obrigatório').should('be.visible');
    cy.contains('CPF obrigatório').should('be.visible');
    cy.contains('Insira uma data válida').should('be.visible');
  });

  it('should create a new registration and navigate to dashboard', () => {
    cy.get('input[placeholder="Nome"]').type('Jane Doe');
    cy.get('input[placeholder="Email"]').type('jane.doe@example.com');
    cy.get('input[placeholder="CPF"]').type('44764335026');
    cy.get('input[type="date"]').type('2021-01-01');
    cy.get('button[type="submit"]').click();

    cy.wait('@createRegistration');

    cy.url().should('include', '/dashboard');
    cy.contains('Item cadastrado com sucesso!').should('be.visible');
  });
});
