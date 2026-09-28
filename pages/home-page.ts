import { Page, Locator} from '@playwright/test';
import { HOME_PAGE_TEXTS } from '../constants/app-text';

export class HomePage {
  readonly page: Page;
  readonly newTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTaskButton = page.getByRole('button', {name: HOME_PAGE_TEXTS.NEW_TASK_BUTTON});
  }
}