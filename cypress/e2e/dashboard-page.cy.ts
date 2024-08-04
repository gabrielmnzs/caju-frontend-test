describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/registrations', {
      statusCode: 200,
      body: [
        {
          id: '1',
          employeeName: 'John Doe',
          email: 'john.doe@example.com',
          admissionDate: '2021-01-01',
          cpf: '70932936032',
          status: 'REVIEW',
        },
      ],
    });

    cy.visit('#/dashboard');
  });

  it('should display the registration list', () => {
    cy.contains('John Doe').should('be.visible');
  });

  it('should search for a registration by CPF', () => {
    const cpf = '70932936032';

    cy.intercept('GET', `/registrations?cpf=${cpf}`, {
      statusCode: 200,
      body: [
        {
          id: '1',
          employeeName: 'John Doe',
          email: 'john.doe@example.com',
          admissionDate: '2021-01-01',
          cpf: '70932936032',
          status: 'REVIEW',
        },
      ],
    }).as('searchRequest');

    cy.get('input[placeholder="Digite um CPF válido"]').type(cpf);
    cy.get('input[placeholder="Digite um CPF válido"]').type('{enter}');

    cy.wait('@searchRequest');

    cy.contains('John Doe').should('be.visible');
  });

  it('should refresh the registration list', () => {
    cy.get('[aria-label="refetch"]').click();

    cy.contains('John Doe').should('be.visible');
  });

  it('should change the status of a registration', () => {
    cy.intercept('PUT', '/registrations/1', {
      statusCode: 200,
      body: {
        id: '1',
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        admissionDate: '2021-01-01',
        cpf: '70932936032',
        status: 'APPROVED',
      },
    }).as('updateStatus');

    cy.intercept('GET', '/registrations', {
      statusCode: 200,
      body: [
        {
          id: '1',
          employeeName: 'John Doe',
          email: 'john.doe@example.com',
          admissionDate: '2021-01-01',
          cpf: '70932936032',
          status: 'APPROVED',
        },
      ],
    }).as('getRegistration');

    cy.contains('John Doe').should('be.visible');

    cy.contains('John Doe')
      .parents('[data-testid="registration-card"]')
      .within(() => {
        cy.contains('Aprovar').click();
      });

    cy.contains('Confirmar ação').should('be.visible');
    cy.contains('Você tem certeza que deseja aprovar este item?').should(
      'be.visible'
    );
    cy.get('button').contains('Confirmar').click();

    cy.wait('@updateStatus');
    cy.log('Status atualizado');
    cy.wait('@getRegistration');

    cy.contains('John Doe')
      .parents('[data-testid="registration-card"]')
      .within(() => {
        cy.contains('Revisar novamente').should('be.visible');
      });
  });

  it('should close the confirmation modal when "Cancelar" is clicked', () => {
    cy.contains('John Doe').should('be.visible');

    cy.contains('Aprovar').click();

    cy.contains('Confirmar ação').should('be.visible');
    cy.contains('Você tem certeza que deseja aprovar este item?').should(
      'be.visible'
    );

    cy.contains('Cancelar').click();

    cy.contains('Confirmar ação').should('not.exist');
  });

  it('should navigate to the new registration page', () => {
    cy.contains('Nova Admissão').click();

    cy.url().should('include', '/new-registration');
  });
});
