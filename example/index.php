<?php

	// The URL to the directory, ending without a trailing slash
	$base_url = "/example/";
	$version = "../minified/";

	date_default_timezone_set('America/New_York');
	$ie6_age = date('Y') - 2001;

	function html_safe($string) {return htmlentities($string);}

?><!DOCTYPE html>
<html>
<head>
	<title>Heretic Clippy</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript" src="src/ie6.min.js"></script>
	<link rel="stylesheet" media="all" href="css/screen.css" />
</head>
<body>

<article id="wrap"> 

	<h1>Heretic Clippy</h1>

	<div id="clipzone"><img src="images/clippy-main.png" width="102" height="98" alt="" class="mr_clippy" /></div>

	<button onclick="this.setAttribute('disabled',1);new Clippy('body','src/').run({override:true});">Try It!</button>
	<button onclick="document.getElementById('textzone').style.display='block'; this.parentNode.removeChild(this);">Shut the hell up and give me the code</button>

	<p>This script will check on pageload to see if the User is running IE6.  If so, Heretic Clippy will appear and offer some browser alternatives.  Quite annoying!  Yet, certainly not as annoying as supporting a browser more than <?php echo $ie6_age; ?> years after it's first release (and several major revisions out of date).</p>
	<!-- <p>Heretic Clippy is open source software availale for your free use, distribution and modification under the <a href="http://opensource.org/licenses/MIT">MIT license</a>.</p> -->

	<div id="textzone">

		<h2>CDN</h2>

		<code><?php echo html_safe('<script src="http://clippy.ajbnet.com/latest/ie6-auto.js"></script>'); ?></code>
		<p><strong>Copy</strong> the above script tag in it's entirety, and insert it into the &lt;head&gt; of your site's header file, or the &lt;head&gt; section of a particular page.</p>

		<h2>Hosted</h2>

		<p><strong>Download</strong> the source from <a href="https://github.com/sprky0/Heretic-Clippy/releases">GitHub</a>.</p>
		<p><strong>Upload</strong> the script to your webroot or to your CDN, and make a note of the full path.  For example:</p>
		<code>/clippy/</code>

		<p><strong>Init</strong> clippy using jQuery's document.ready wrap, eg:</p>
		<code><?php echo html_safe("<script>

$(function(){
	new Clippy('body','/clippy/').run();
});

</script>"); ?></code>

		<p>Or use the <strong>included</strong> document.ready init:</p>
		<code><?php echo html_safe("<script>

__clippyboot(function(){
	new Clippy(\"body\",\"/clippy/\").run();
});

</script>"); ?></code>

	</div>

	<div class="meta">
@version 1.1.0
@author sprky0
@license <a href="http://opensource.org/licenses/MIT">MIT Lisence</a>
	</div>

	<br class="clear" />

</article>

<aside class="ribbon">
	<a href="https://github.com/sprky0/Heretic-Clippy/">Fork me on GitHub</a>
</aside>

</body>
</html>