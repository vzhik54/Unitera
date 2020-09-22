const puppeteer = require('puppeteer');

describe('Google', () => {
	let page, browser;

	beforeAll(async () => {
		try{
			browser = await puppeteer.launch({
				headless: false,
				defaultViewport: null,
				args:[ '--start-maximized' ],
				executablePath: 'C:\\Program Files \(x86\)\\Google\\Chrome\\Application\\chrome.exe',
				slowMo: 25
			});
			page = await browser.newPage();
			await page.goto(YANDEX);
			await page.waitForSelector('#text');
		}
		catch (error) {
			console.log(error);
		}
	});
	afterAll(async () => {
		await browser.close();
	});
	
	test('Test case "internet shop Dyson"', async () => {
		
		let inputSearch = await page.$('#text');
		await inputSearch.type("пылесос дайсон");
		await page.click('.search2__button');
		await page.waitForNavigation();
	  
		const linkDyson = await page.$('a[href*="www.dyson.com.ru"]');
		const newPagePromise = new Promise(x => page.once('popup', x));
		if (linkDyson) {
			await linkDyson.click();
			  
			// await page.waitForNavigation();
		// } else {
			// // no link with such attribute on the page, click another button...
		}

		const newPage = await newPagePromise; 
		await newPage.waitForSelector('.header-cta');
		// await newPage.hover('#ctl00_Header_HeaderLinks_TopNavigationLinksRepeater_ctl01_TopNavigationLink'); // opens dropdown menu(Аксессуары)
		await newPage.click('#ctl00_cphFooter_footer_footerLinks_CategoriesRepeater_ctl00_LinksNameRepeater_ctl05_FooterLink');
		await newPage.waitForSelector('.amount');
		const target = "Фильтр для очистителя воздуха";
		const filter = await newPage.$x(`//h5[@class="product-name"][contains(., "${target}")]`);

		expect(await filter.length).toBeTruthy();

	});
});