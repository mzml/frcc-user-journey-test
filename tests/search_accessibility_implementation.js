/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    setViewPort,
    accessibility,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    emulateDevice,
    scrollDown,
    waitFor
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless });
    // await setViewPort({width:312, height:810});
    await emulateDevice("iPhone X");
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("User goes to the homepage", async function () {
    await goto("www.frontrange.edu/");
});

step("Run accessibility audit", async function () {
    const audit = await accessibility.runAudit();
    console.log("\n\nAccessibility Score according to taiko-accessibility: " + audit.score);
});

step("User searches for <program_name>", async function(program_name) {
    // await scrollDown("Browse All Programs");
	await write(program_name, into(textBox({name: "search"})));
    await press('Enter');
    await waitFor(5000);
});

step("User has <result> in the results", async function(result) {
	assert.ok(await text(result).exists());
});