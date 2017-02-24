import { RxLesson1Page } from './app.po';

describe('rx-lesson1 App', function() {
  let page: RxLesson1Page;

  beforeEach(() => {
    page = new RxLesson1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
