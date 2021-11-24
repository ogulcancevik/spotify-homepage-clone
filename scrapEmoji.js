const puppeteer = require("puppeteer");
const download = require("image-downloader");
const mkdirp = require("mkdirp");

(async () => {
  var args = process.argv.slice(2);
  mkdirp(`./${args[1]}`);
  const url = `${args[0]}`;

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const elCount = await page.evaluate(() => {
    const el = document.querySelector(
      "#FnEmojiDetail > div.mdBox03Inner01 > div.MdCMN09DetailView.mdCMN09Emoji > div.mdCMN09ImgList > div.mdCMN09ImgListWarp > ul"
    );
    return el.childElementCount;
  });
  const elementURL = await page.evaluate(() => {
    const el = document.querySelector(
      "#FnEmojiDetail > div.mdBox03Inner01 > div.MdCMN09DetailView.mdCMN09Emoji > div.mdCMN09ImgList > div.mdCMN09ImgListWarp > ul > li"
    );
    return Object.values(el).map((item) => item.preview);
  });
  for (let i = 1; i <= elCount; i++) {
    if (elementURL[1].animationUrl === "") { // ANIMASYON YOKSA?
      const options = {
        url:
          i < 10
            ? elementURL[1].staticUrl.replace("001", `00${i}`)
            : elementURL[1].staticUrl.replace("001", `0${i}`),
        dest: `./${args[1]}`,
      };
      download
        .image(options)
        .then(({ filename }) => {
          console.log("Kaydedildi", filename);
        })
        .catch((err) => console.error(err));
    } else { // ANIMASYON VARSA?
      const options = {
        url:
          i < 10
            ? elementURL[1].animationUrl.replace("001", `00${i}`)
            : elementURL[1].animationUrl.replace("001", `0${i}`),
        dest: `./${args[1]}`,
      };
      download
        .image(options)
        .then(({ filename }) => {
          console.log("Kaydedildi", filename);
        })
        .catch((err) => console.error(err));
    }
  }
  browser.close();
})();
