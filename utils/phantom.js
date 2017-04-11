/*========================================*
 * PHANTOMJS SCRIPT TO RENDER PAGE AS PDF *
 *========================================*/


const args = require('system').args;
const page = require('webpage').create();

// Configure sizing
const w = 1024, h = 768;
page.viewportSize = {width: w, height: h};
page.clipRect = {top: 0, left: 0, width: w, height: h};

// Open the page
page.open(args[1], function (status) {
  if (status == 'fail') {
    phantom.exit(1);
  }

  page.render(args[2]);
  phantom.exit(0);
});
