<?php

	// The URL to the directory, ending without a trailing slash
	$base_url = "./";
	$version = "1.0.2";

	date_default_timezone_set('America/New_York');

	$ie6_age = date('Y') - 2001;
	// $ie7_age = date('Y') - 2006;
	// $ie8_age = date('Y') - 2009;
	// $ie9_age = date('Y') - 2011;

	function html_safe($string) {return htmlentities($string);}

?><!DOCTYPE html>
<html>
<head>
	<title>Heretic Clippy</title>
	<script type="text/javascript" src="<?php echo $base_url . $version; ?>/ie6.js"></script>
	<link rel="stylesheet" media="all" href="<?php echo $base_url; ?>css/screen.css" />
</head>
<body>

<div id="wrap"> 

	<h1>Heretic Clippy</h1>

	<div id="clipzone"><img src="<?php echo $base_url; ?>images/clippy-main.png" width="102" height="98" alt="" class="mr_clippy" /></div>

	<button onclick="this.setAttribute('disabled',1);new Clippy('body','<?php echo $base_url . $version; ?>/').run({override:true});">Try It!</button>
	<button onclick="document.getElementById('textzone').style.display='block'; this.parentNode.removeChild(this);">Shut the hell up and give me the code</button>

	<div id="textzone">

		<p><strong>Upload</strong> the script to your webroot or to your CDN, and make a note of the full path.  For example:</p>
		<code><?php echo html_safe($base_url); ?></code>

		<p>
			<strong>Include</strong>
			the script into the &lt;head&gt; as shown below, or if you are more into load optimization then rigid standards, at the very very end of your page before the closing body tag.
		</p>
		<code><?php echo html_safe("<script src=\"{$base_url}{$version}/ie6-auto.js\"></script>"); ?></code>

		<p><strong>Init</strong> clippy using jQuery's document.ready wrap, eg:</p>
		<code><?php echo html_safe("<script>

$(function(){
	new Clippy('body','{$base_url}/clippy/').run();
});

</script>"); ?></code>

		<p>Or use the <strong>included</strong> document.ready init:</p>
		<code><?php echo html_safe("<script>

__clippyboot(function(){
	new Clippy(\"body\",\"{$base_url}\").run();
});

</script>"); ?></code>


	</div>

	<p>This script will check on pageload to see if the User is running IE6.  If so, Heretic Clippy will appear and offer some browser alternatives.  Quite annoying!  Yet, certainly not as annoying as supporting a browser more than <?php echo $ie6_age; ?> years after it's first release (and several major revisions out of date).</p>

	<pre>
@version 1.0.2
@author sprky0
	</pre>

	<br class="clear" />

</div>

</body>
</html>