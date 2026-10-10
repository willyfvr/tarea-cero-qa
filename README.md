# Tarea Cero QA

End-to-end browser tests for the Tarea Cero web application at [tareacero.interaad.com.ar](https://tareacero.interaad.com.ar/). The suite uses Playwright Test, TypeScript, and Flutter accessibility semantics to verify public login, registration-validation, and password-recovery journeys. Authenticated navigation is covered when authorized test accounts are configured.

The configured default target is the URL above. Set `BASE_URL` to run the same checks against another authorized deployment.

## Requirements

- Node.js 20 or newer
- npm
- Access to the target application
- Authorized test accounts for sign-in scenarios

## Set Up

```sh
npm ci
npx playwright install
```

Copy `.env.example` to `.env`, then fill in credentials for accounts you are authorized to use. Keep `.env` local; it is ignored by Git.

PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```sh
cp .env.example .env
```

## Configuration

| Variable             | Purpose                                  | Required                                 |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| `BASE_URL`           | Application URL used by `page.goto('/')` | No; defaults to the Tarea Cero URL above |
| `TEST_PRO_USER`      | Username or email for a PRO account      | Only for the PRO login test              |
| `TEST_PRO_PASS`      | Password for the PRO account             | Only for the PRO login test              |
| `TEST_STANDARD_USER` | Username or email for a standard account | Only for the standard login test         |
| `TEST_STANDARD_PASS` | Password for the standard account        | Only for the standard login test         |

Login tests are skipped when their account credentials are not configured. Never commit credentials or paste them into test source code. For CI, add the account values as GitHub Actions secrets with the same names.

## Run Tests

| Command                 | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `npm test`              | Run the suite in Chromium, Firefox, and WebKit    |
| `npm run test:chromium` | Run only Chromium tests for a quicker local check |
| `npm run test:headed`   | Run tests with a visible browser window           |
| `npm run test:ui`       | Open Playwright's interactive test runner         |
| `npm run report`        | Open the latest HTML report                       |

Run one spec or filter by test title with the Playwright CLI:

```sh
npx playwright test tests/access-page.spec.ts --project=chromium
npx playwright test --grep "login form" --project=chromium
```

The report is generated in `playwright-report/`. Screenshots, videos, and traces are retained for failed tests to help diagnose browser or application issues.

## Test Design

- `tests/` contains user-facing scenarios. Assertions use Playwright's auto-retrying `expect` matchers instead of fixed sleeps.
- `pages/` contains page objects that group accessible locators for repeated UI elements.
- `constants/app-text.ts` keeps application labels used by those page objects.
- `utils/flutter-helpers.ts` enables Flutter's accessibility semantics so tests can use role- and label-based locators.
- Registration and password-recovery checks only submit blank forms, verifying validation without creating an account or sending email. Valid registration and recovery submissions remain out of scope until safe test data and side-effect handling are confirmed.
- Task creation remains `fixme`: it changes application data, and a disposable account plus reliable cleanup strategy have not been confirmed.
- Google sign-in depends on an external provider and is not covered by the UI suite.

Prefer locators by role, label, or visible text. Add comments to explain a Playwright concept or a non-obvious application constraint, not to narrate each line. Keep browser tests independent and avoid arbitrary `waitForTimeout` calls where a locator or web-first assertion can wait for the expected state.

## Continuous Integration

The workflow in `.github/workflows/playwright-tests.yml` runs on pushes to `main`/`master`, daily at 08:00 UTC, and through manual dispatch. It installs the browsers, runs the suite, and publishes the HTML report as a GitHub Actions artifact and GitHub Pages site. Configure the login credentials as repository Actions secrets before expecting authenticated tests to run.

The latest published report is available at [GitHub Pages](https://willyfvr.github.io/tarea-cero-qa/).

## Troubleshooting

- If Playwright reports a missing browser, run `npx playwright install` again.
- If login tests are skipped, check that the matching username and password variables are set in `.env` or CI secrets.
- If the target is unavailable, check `BASE_URL` and confirm the application can be reached from your machine or runner.
- To inspect a failure, open the HTML report with `npm run report`; trace files can be opened with `npx playwright show-trace <trace.zip>`.
