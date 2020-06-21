describe('Home page', () => {
  it('displays a page that lets you play snake', () => {
    cy.visit('/');
    cy.contains('#nav a', 'Play');
    cy.contains('#nav a', 'Manage');
    cy.contains('h1', 'Play Snake');
    cy.contains('[data-cy=new-game-btn]', 'New game');
    cy.contains('[data-cy=random-game-btn]', 'Watch the computer play');
  });

  it('lets the user play when the user clicks "New game"');

  it('plays a random game when the user clicks "Watch the computer play"', () => {
    cy.visit('/');
    cy.get('[data-cy=random-game-btn]').click();

    // Board starting state
    cy.contains('div.info span.game-info', 'Game ID:');
    cy.contains('div.info span.game-info', 'Turn # 0');
    cy.contains('div.info span.score', '0');

    cy.get('div.board div.row').should('have.length', 10);
    cy.get('div.board div.row div.cell').should('have.length', 100);
    cy.get('div.board div.row div.cell.apple').should('have.length', 1);
    cy.get('div.board div.row div.cell.snake-head').should('have.length', 1);

    let snakeBodyStart;
    cy.get('div.board div.row div.cell.snake').should('have.length', 3).then(($snake) => {
      let snakeList = [];
      $snake.each((x) => {
        snakeList.push($snake[x]);
      });

      snakeBodyStart = snakeList.map(x => x.attributes['data-cy'].value).join('|');
    });

    // Board ending state
    cy.get('div.info.game-over').then(() => {
      cy.contains('div.info.game-over span.game-info', 'Game ID:');
      cy.contains('div.info.game-over span.game-info', 'Turn #');
      cy.get('div.info.game-over span.score');
      cy.get('div.board div.row').should('have.length', 10);
      cy.get('div.board div.row div.cell').should('have.length', 100);
      cy.get('div.board div.row div.cell.apple').should('have.length', 1);
      cy.get('div.board div.row div.cell.snake-head').should('have.length', 1);

      let snakeBodyEnd;
      cy.get('div.board div.row div.cell.snake').then(($snake) => {
        let snakeList = [];
        $snake.each((x) => {
          snakeList.push($snake[x]);
        });

        snakeBodyEnd = snakeList.map(x => x.attributes['data-cy'].value).join('|');
        expect(snakeList.length).to.be.at.least(3);

        // Because of how the snake's starting position is generated on the server, it is not
        // possible for it to lose in it's starting position, so it is safe to assert that they are
        // different.
        expect(snakeBodyStart).to.not.equal(snakeBodyEnd);
      });
    });
  });
});
