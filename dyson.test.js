const puppeteer = require('puppeteer');
const { Severity } = require("jest-allure/dist/Reporter");

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
	
	test('Тестовое задание для Unitera Lab"', async () => {
		reporter
			.description("Проверка доступности фильтра для очистителя воздуха на вкладке 'Насадки и аксессуары' сайта www.dyson.com.ru")
			.severity(Severity.Normal)
			.testId('TEST-01');
			
		const target = "Фильтр для очистителя воздуха";
		
		await reporter.startStep("Выдача результата поиска в яндексе по фразе 'пылесос дайсон'");
		let inputSearch = await page.$('#text');
		await inputSearch.type("пылесос дайсон");
		await page.click('.search2__button');
		await page.waitForNavigation();
		await reporter.endStep();
	  
		const linkDyson = await page.$('a[href*="www.dyson.com.ru"]');
		const newPagePromise = new Promise(x => page.once('popup', x));
		
		await reporter.startStep("Переход на сайт фирменного магазина Dyson");
		try {
			await linkDyson.click();
		}
		catch (error) {
			console.log(error);
		}
		await reporter.endStep();
		
		const newPage = await newPagePromise; 
		await newPage.waitForSelector('.header-cta');
		// await newPage.hover('#ctl00_Header_HeaderLinks_TopNavigationLinksRepeater_ctl01_TopNavigationLink'); // opens dropdown menu(Аксессуары)
		
		await reporter.startStep("Переход на вкладку 'Насадки и аксессуары'");
		await newPage.click('#ctl00_cphFooter_footer_footerLinks_CategoriesRepeater_ctl00_LinksNameRepeater_ctl05_FooterLink');
		await newPage.waitForSelector('.amount');
		await reporter.endStep();
		
		await reporter.startStep("Проверка существования фильтра для очистителя воздуха на странице");
		const filter = await newPage.$x(`//h5[@class="product-name"][contains(., "${target}")]`);
		expect(await filter.length).toBeTruthy();
		await reporter.endStep();

	});
});