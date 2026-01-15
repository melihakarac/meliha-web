# Testing Guide

This project includes comprehensive testing setup with unit tests, integration tests, and end-to-end (e2e) tests.

## Test Structure

### Unit Tests

Unit tests are located alongside the components, hooks, and utilities they test:

- Component tests: `src/components/**/*.test.js`
- Hook tests: `src/hooks/*.test.js`
- Utility tests: `src/utils/*.test.js`

### Integration Tests

Integration tests test component interactions and workflows:

- Integration tests: `src/**/*.integration.test.js`

### E2E Tests

End-to-end tests are located in the `cypress/e2e/` directory:

- Navigation tests: `cypress/e2e/navigation.cy.js`
- Contact form tests: `cypress/e2e/contact-form.cy.js`
- Responsive design tests: `cypress/e2e/responsive.cy.js`
- Accessibility tests: `cypress/e2e/accessibility.cy.js`

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Unit Tests Only

```bash
npm run test:unit
```

### Run Integration Tests Only

```bash
npm run test:integration
```

### Run All Tests with Coverage

```bash
npm run test:all
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run E2E Tests

#### Open Cypress Test Runner (Interactive)

```bash
npm run test:e2e:open
```

#### Run E2E Tests Headless

```bash
npm run test:e2e:headless
```

#### Run E2E Tests (Default)

```bash
npm run test:e2e
```

**Note:** Make sure the development server is running (`npm start`) before running e2e tests.

## Test Utilities

### `renderWithI18n`

Custom render function that includes i18n provider for components that use translations:

```javascript
import { renderWithI18n } from 'utils/testUtils';

renderWithI18n(<MyComponent />);
```

### `mockIntersectionObserver`

Mocks the IntersectionObserver API for components that use scroll reveal:

```javascript
import { mockIntersectionObserver } from 'utils/testUtils';

beforeEach(() => {
  mockIntersectionObserver();
});
```

## Writing Tests

### Unit Test Example

```javascript
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render button element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Integration Test Example

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './index';
import { renderWithI18n } from 'utils/testUtils';

describe('Contact Integration', () => {
  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Contact />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Test Example

```javascript
describe('Navigation', () => {
  it('should navigate to sections', () => {
    cy.visit('/');
    cy.contains('a', /about/i).click();
    cy.url().should('include', '#about');
    cy.get('#about').should('be.visible');
  });
});
```

## Test Coverage

The project aims for comprehensive test coverage:

- **Unit Tests**: Test individual components, hooks, and utilities in isolation
- **Integration Tests**: Test component interactions and workflows
- **E2E Tests**: Test complete user flows and critical paths

## Cypress Custom Commands

The project includes custom Cypress commands for common operations:

### `cy.waitForAnimations()`

Waits for CSS transitions to complete.

### `cy.scrollToSection(sectionId)`

Scrolls to a specific section and waits for animations.

### `cy.fillContactForm(formData)`

Fills the contact form with provided data.

### `cy.isInViewport()`

Checks if an element is in the viewport.

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it.
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`.
3. **Test User Interactions**: Use `userEvent` for simulating user interactions.
4. **Keep Tests Isolated**: Each test should be independent and not rely on other tests.
5. **Mock External Dependencies**: Mock API calls, timers, and browser APIs as needed.
6. **Test Accessibility**: Include accessibility checks in your tests.

## Troubleshooting

### Tests Failing Due to Missing Mocks

If a test fails due to missing mocks, check:

1. Are all dependencies properly mocked?
2. Is `mockIntersectionObserver()` called in `beforeEach`?
3. Are React portals properly mocked for components using `createPortal`?

### E2E Tests Failing

1. Ensure the development server is running (`npm start`)
2. Check that the base URL in `cypress.config.js` matches your dev server URL
3. Verify that all required elements exist in the DOM

### Coverage Issues

Run `npm run test:all` to see coverage report and identify untested code paths.
