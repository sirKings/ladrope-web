import { LadRopePage } from './app.po';

describe('lad-rope App', () => {
  let page: LadRopePage;

  beforeEach(() => {
    page = new LadRopePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
