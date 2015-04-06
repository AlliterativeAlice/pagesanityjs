var page = require('webpage').create();
var system = require('system');
var pageLoaded = false;
var pageHasError = false;
	
var options = {
	verbose: false, //Log successful requests to console
	quiet: false, //Don't log failed requests to console
	timeout: 10000, //How long to wait for page to load.
	waitForTimeout: false //Whether to wait out the timeout even after the page loads.
};

if (system.args.length === 1) {
    console.log('Usage: pagesanity.js [options] <page URL>');
    phantom.exit(1);
}
else
{
    var pageUrl = system.args[system.args.length - 1];
	
	//Read any option overrides specified in the command line arguments
	for (var i = 1; i < system.args.length - 1; i++) {
		processOptionArg(system.args[i], options);
	}
	
	//Start counting down the timeout
	var timeRemaining = options.timeout;
	setInterval(function () {
		timeRemaining -= 10;
		if (timeRemaining <= 0) {
			if (!pageLoaded) console.log('Request to ' + pageUrl + ' timed out');
			performExit();
		}
	}, 10);
	
    page.onResourceReceived = function (res) {
		if (res.stage === 'end') {
			if (res.status === 200) pageLoaded = true; //First 200 response indicates page has loaded
			if (res.status >= 400) {
				//Request failed
				pageHasError = true;
				if (!options.quiet) console.log('HTTP ERROR ' + res.status + ': ' + res.url);
			}
			else {
				//Request succeeded
				if (options.verbose) console.log('HTTP SUCCESS ' + res.status + ': ' + res.url);
			}
		}
    };
	
	page.onError = function (msg) {
		pageHasError = true;
		if (!options.quiet) console.log('JAVASCRIPT ERROR: ' + msg);
	};

    page.open(pageUrl, function (status) {
        if (status !== 'success') {
            console.log('Failed to load ' + pageUrl);
			performExit();
        }
		
        if (!options.waitForTimeout) performExit();
    });
}

function performExit() {
	if (pageLoaded && !pageHasError) phantom.exit();
	else phantom.exit(1);
}

function processOptionArg(arg, options) {
	arg = arg.toLowerCase();
	if (arg === '-v' || arg === '--verbose') options.verbose = true;
	else if (arg === '-q' || arg === '--quiet') options.quiet = true;
	else if (arg === '-w' || arg === '--wait-for-timeout') options.waitForTimeout = true;
	else if (arg.substring(0, 3) == '-t=' || arg.substring(0, 10) == '--timeout=') {
		var splitArg = arg.split('=');
		if (isNaN(splitArg[1])) {
			console.log('Invalid timeout value specified');
			phantom.exit(1);
		}
		else options.timeout = parseInt(splitArg[1]);
	}
}