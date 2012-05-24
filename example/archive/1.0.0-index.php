<!DOCTYPE html>
<html>
<head>
	<title>Heretic Clippy</title>
	<script type="text/javascript" src="http://clippy.ajbnet.com/1.0.0/ie6.js"></script>
	<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#username=sprky0"></script>
	<style type="text/css">

		body {background-color: #888;}
		h1,h3,p,a {font-family: helvetica,arial,Sans;}
		h1 {border-bottom: 1px dotted #ccc;}
	
		#wrap {
			width: 700px; margin: 40px auto; padding: 40px;
			-moz-border-radius: 20px; -webkit-border-radius: 20px; border-radius: 20px;
			background-color:#fff;
		}
		#textzone {display:none; border: 1px solid #ccc; padding: 20px; margin: 10px 0; }
		#textzone textarea {	
			margin: 0 0 10px 0; width: 650px;
			color: #0f0; background-color:#030;
			border: 0; padding: 5px;
			white-space: nowrap; x-overflow: auto;
		}
		#textzone p {font-size: 10pt; color: #666;}
		pre {font-family: courier;margin: 10px 0 10px 0;padding: 0;}
		
		#sharebox { float: right; }

		.clear {clear:both}

	</style>
	<script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	</script>
</head>
<body>


	<div id="wrap"> 
	<h1>Heretic Clippy</h1>

	<button onclick="new Clippy('body','/latest/').run({override:true});">Try It!</button>
	<button onclick="document.getElementById('textzone').style.display='block'; this.parentNode.removeChild(this);">Shut the hell up and give me the code</button>

	<div id="textzone">
		<textarea readonly><script type="text/javascript" src="http://clippy.ajbnet.com/latest/ie6-auto.js"></script></textarea>
		<p>
			<strong>Instructions</strong> - 
			Copy the above script tag in it's entirety, and insert it into the &lt;head&gt; of your site's header file, or the &lt;head&gt; section of a particular page.
		</p>
	</div>

	<p>This script will check on pageload to see if the User is running IE6.  If so, Heretic Clippy will appear and offer some browser alternatives.  Quite annoying!  Yet, certainly not as annoying as the expectation of some for support of a browser more than 9 years after it's first release (and 3 major revisions out of date).</p>

	<pre>
@version 1.0.0
@author sprky0
	</pre>


		<!-- AddThis Button BEGIN -->
		<div class="addthis_toolbox addthis_32x32_style addthis_default_style" id="sharebox">
		    <a class="addthis_button_facebook"></a>
		    <a class="addthis_button_twitter"></a>
		    <a class="addthis_button_email"></a>
		    <a class="addthis_button_google"></a>
		    <a class="addthis_button_compact"></a>
		</div>
		<!-- end -->

		<br class="clear" />

	</div>


<script type="text/javascript"> try {
var pageTracker = _gat._getTracker("UA-16286991-1");
pageTracker._setDomainName(".ajbnet.com");
pageTracker._trackPageview();
} catch(err) {}</script>



</body>
</html>