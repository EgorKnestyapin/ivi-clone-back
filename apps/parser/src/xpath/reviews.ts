export const nextPageXpath =
  '//div[contains(@class, "navigator")]//a[contains(@href, "/reviews/ord/date/status/all/perpage/10/page") and text()="»"]/parent::li';
export const reviewPageXpath =
  '//div[contains(@class, "reviewItem") and contains(@class, "userReview")]//p[@class="links"]/a[text()="прямая ссылка"]/parent::p';
export const reviewTitleXpath = '//p[@class="sub_title"]';
export const reviewBodyXpath = '//span[@itemProp="reviewBody"]';
export const reviewerXpath =
  '//p[contains(@class, "profile_name")]/a[starts-with(@href, "/user/") and not (contains(@href, "comment")) ]';
