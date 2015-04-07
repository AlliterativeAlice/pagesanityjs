# PageSanity.js
Provides a simple sanity check to verify that all a page's assets (images, JavaScript/CSS files, etc.) load and that it doesn't fire any JavaScript errors on page load. Requires [PhantomJS](http://phantomjs.org/) to run.

When run, PageSanity.js loads the specified page, optionally waits for a specified period on it, and exits with an error code of 1 if HTTP or JavaScript errors occured, or 0 if there were no errors.

## Usage
```bash
$ phantomjs path/to/pagesanity.js [url-of-page-to-test]
```

With options:

```bash
$ phantomjs [phantom arguments] path/to/pagesanity.js [pagesanity.js options] [ [url-of-page-to-test]
```

## Options

### -v / --verbose

Logs successful HTTP requests to the console in addition to failed one.

```bash
$ phantomjs pagesanity.js -v http://www.example.com/index.html
$ phantomjs pagesanity.js --verbose http://www.example.com/index.html
```

### -q / --quiet

Doesn't log HTTP or JavaScript errors to the console. If -v and -q are combined, only successful HTTP requests will be logged.

```bash
$ phantomjs pagesanity.js -q http://www.example.com/index.html
$ phantomjs pagesanity.js --quiet http://www.example.com/index.html
```

### -w / --wait-for-timeout

If -w is specified, PageSanity.js will wait on the page until the timeout expires. This can be useful if you want to catch errors in JavaScript that runs after the page loads, ajax requests, or other asynchronously-loaded content.

```bash
$ phantomjs pagesanity.js -w http://www.example.com/index.html
$ phantomjs pagesanity.js --wait-for-timeout http://www.example.com/index.html
```

### -t=&#35; / --timeout=&#35;

-t can be used to specify the length of the timeout (how long PageSanity.js will wait for the page to load, or how long it will wait on the page if the -w option is specified.) The timeout is specified in miliseconds, and the default is 10000 miliseconds.

```bash
$ phantomjs pagesanity.js -t=5000 http://www.example.com/index.html
$ phantomjs pagesanity.js --timeout=5000 http://www.example.com/index.html
```
