import { AngularCommercePage } from './app.po';

describe('angular-commerce App', () => {
  let page: AngularCommercePage;

  beforeEach(() => {
    page = new AngularCommercePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
