Hereric-Clippy
==============

Clippy is back from the grave to let you know that your browser is wrong.

Put someplace, for example '/clippy/' off your docroot, then use thusly (assuming you have jQuery):

 <script>$(function(){new Clippy('body','/clippy/').run();});</script>

Or thusly without:

 <script>__clippyboot(function(){new Clippy(\"body\",\"/clippy/\").run();});</script>
 

Enjoy!