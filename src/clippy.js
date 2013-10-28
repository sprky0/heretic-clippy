/**
 * Heretic Clippy
 *
 * @version 1.2.0
 * @author sprky0
 * @source https://github.com/sprky0/Heretic-Clippy/blob/master/src/ie6.js
 * @license MIT License, http://opensource.org/licenses/MIT
 */
;(function(window){

	/**
	 * delay executing a closure until the document is available to interact with
	 * @param function run
	 * @void
	 */
	var __clippyboot = function(run) {
		var _run = run;
		if (!document.getElementsByTagName("body")[0]) {
			setTimeout(function(){__clippyboot(_run);},10);
		} else {
			_run();
		}
	}

	/**
	 * generate a unique ID
	 */
	var GUID = {
		base : "_",
		cur : 0,
		get : function(){
			this.cur++;
			return this.base+this.cur;
		}
	}

	/**
	 * apply css from an object of values to 
	 * @param HTMLElement o
	 * @param object css
	 * @void
	 */
	var css = function(o,css) {
		for(var i in css)
			o.style[i] = css[i];
	}

	/**
	 * appendChild shorthand function
	 * 
	 * @param HTMLElement obj1
	 * @param HTMLElement|mixed obj2
	 */
	var add = function(obj1,obj2) {
		obj1.appendChild(obj2);
	}

	/**
	 * 
	 *
	 * @param string Question
	 * @param boolean reusable Flag the 
	 */
	var HelpText = function(_question,reusable) {

		this.question = _question;
		this.options = [];
		this.key = GUID.get();
		this.views = 0;
		this.reusable = (reusable === true);
		this.timeout = {};

		this.available = function() {
			return (this.views < 1 || this.reusable === true);
		}
		this.addResponseURL = function(_text,_url) {
			this.options.push({text:_text,URL:_url,rel:"external"});
			return;
		}
		this.addResponse = function(_text,_callback) {
			this.options.push({text:_text,callback:_callback,rel:"internal"});
			return;
		}
		this.addTimeout = function(_timeout,_callback) {
			this.timeout = {callback:_callback,timeout:_timeout};
		}
		this.getKey = function() {
			return this.key;
		}
		this.toString = function() {
			return this.getKey();	
		}
		this.toElements = function() {
	
			this.views++;
	
			var div = document.createElement('div');
			var p = document.createElement('p');
			p.innerHTML = this.question;
			add(div,p);

			for(var i = 0; i < this.options.length; i++) {
				var button = document.createElement('button');
				button.innerHTML = this.options[i].text;
				if (this.options[i].rel == "internal")
					button.onclick = this.options[i].callback;
				else {
					var _Option = this.options[i];
					button.onclick = function(){
						window.location = _Option.URL;
					}
				}
				add(div,button);
			}
		
			if (this.timeout.callback && typeof(this.timeout.callback) == "function") {
				setTimeout(this.timeout.callback, (this.timeout.timeout ? this.timeout.timeout : 500));
			}
		
			return div;
		}
		return this;	
	}
		
	/**
	 * Clippy
	 */
	var ClippyDisplay = function(options) {

		this.file_dir = (options.file_dir) ? options.file_dir : "";
	
		this.div = document.createElement('div');

		css(this.div,{
			zIndex : 1000000,
			width : "102px",
			height : "98px",
			backgroundColor : "transparent",
			position : "absolute",
			bottom : 0,
			color : "black",
			right : "60px",
			display : "block"
		});

		var img = new Image();
			img.src = this.file_dir + "clippy-main.png";
			img.style.position = "relative";
			img.style.display = "block";

		add(this.div,img);

		this.div.style.opacity = (options.visible === false) ? 0 : 1;
	
		if (options.click && typeof(options.click) == "function") {
			img.onclick = options.click;
		}

		this.getElement = function() {
			return this.div || null;
		}
		this.getPosition = function() {
			return {bottom:this.div.style.bottom,right:this.div.style.right};
		}
		this.fadeIn = function(duration,options) {

			var _clipple = this;

			if (!options) 
				options = {};
			if (!options.step)
				options.step = 1 / 200;
			if (!options.value)
				options.value = 0;
			if (!options.remain)
				options.remain = 200;
			if (!options.increment)
				options.increment = duration / 200;

			options.remain--;
			options.value += options.step;
			_clipple.div.style.opacity = options.value;
			
			if (options.remain > 0) { setTimeout(function(){_clipple.fadeIn(duration,options);}, options.increment); }

			return;
		}
		this.move = function(x,y) {
			css(this.div,{
				bottom : (parseInt(this.div.style.top) + x) + "px",
				right : (parseInt(this.div.style.left) + y) + "px"
			});
		}

		return this;
	}

	/**
	 * Speech Bubble
	 */
	var PopupDisplay = function(o,options) {

		this.file_dir = options.file_dir || "";

		if (typeof(o) === "string") {
			p = document.createElement('p');
			p.innerHTML = o;
			o = p;
		}

		this.div = document.createElement('div');

		css(this.div,{
			zIndex : 1000000,
			width : "130px",
			height : "auto",
			backgroundColor : "transparent",
			color : "black",
			position : "absolute",
			bottom : "85px",
			right : "55px",
			display : "block"
		});
	
		var imgTop = new Image();
		imgTop.src = this.file_dir + "clippy-speech-top.png";
		css(imgTop,{
			position : "relative",
			display : "block"
		});
		add(this.div,imgTop);

		this.message = document.createElement('div');
		this.message.style.background = "transparent url('" + this.file_dir + "clippy-speech-mid.png') top left repeat-y";
		this.message.style.padding = "8px";
		this.message.style.font = "11.5px Arial, Verdana, Sans";
		add(this.message,o);
		add(this.div,this.message);

		var imgBottom = new Image();
		imgBottom.src = this.file_dir + "clippy-speech-bottom.png";
		css(imgBottom,{
			position : "relative",
			display : "block"
		});
		add(this.div,imgBottom);
	
		this.close = function() {
			try {
				var div = this.getElement();
				if (div != null && div.parentNode) {
					div = div.parentNode;
					div.removeChild(this.getElement());
				}
			} catch(e) {
				// alert(e)
			}
		}
		this.getElement = function() {
			return this.div;
		}

		return this;
	}

	/**
	 * Clippy Controller
	 */
	var Clippy = function(_homeSelector,file_dir) {

		this.help = {};
		// What options are OK to use as an introductory question?
		this.firstlines = [];
		this.homebase;
		this.timer = false;
		this.timer_interval = 200;
		this.update_count = 0;
		this.file_dir = file_dir || "";

		this.preload = function() {

			var preload = ["clippy-main.png","clippy-speech-top.png","clippy-speech-mid.png","clippy-speech-bottom.png"];
			var images = [];

			for(var i in preload) {
				images[i] = new Image();
				images[i].onload = function() {
					// console.log('loaded' + this.src);
				}
				images[i].src = this.file_dir + preload[i];
			}
	
		}
		
		this.findHomeBase = function(selector) {
		
			if (!selector)
				selector = "body";
		
			selector += "";
			var ref = false;
			
			if (selector.substr(0,1)=="#") {

				ref = document.getElementById(selector.substr(1,selector.length));
				var div = document.createElement("div");
				div.style.position = "relative";
				add(ref,div);
				return div;

			} else {

				ref = document.getElementsByTagName(selector)[0];

				var div = document.createElement("div");

				css(div,{
					zIndex : 9999999,
					width : "300px",
					height : "300px",
					backgroundColor : "transparent",
					position : "fixed",
					bottom : "0",
					right : "0"
				});

				add(ref,div);

				return div;
			
			}
			
			return ref;
		}
	
		this.run = function(opt) {

			if(!(opt&&opt.override&&opt.override==true)) {

				// we must make sure we only annoy IE6 users
				if (!(/MSIE 6/i.test(navigator.userAgent)))
					return false;
	
			}

			var _c = this;
		
			this.character = new ClippyDisplay({
				click:function(){
					_c.say([Ouch1,Ouch2,Ouch3]);
					_c.move(parseInt(Math.random()*20+-20),parseInt(Math.random()*20+-20));
				},
				file_dir : this.file_dir,
				visible : false
			});
			add(this.homebase,this.character.getElement() );
			this.character.fadeIn(1000);
		
			var Help = new HelpText("I see you're trying to <i>use the internet.</i>  Would you like a friendly suggestion to make your browsing experience a more enjoyable and secure?");
				Help.addResponse("Yes", function(){ _c.say([FireFox,Chrome,Opera],WhyNot); } );
				Help.addResponse("No", function(){ _c.talkLater(); } );
			this.addHelp(Help,true);
		
			var Old = new HelpText("I see you're still <i>using IE6.</i>  That browser was released back in 2001, when strange beasts roamed the earth.<br><br>Would you like some upgrade suggestions?");
				Old.addResponse("Yes", function(){ _c.say([FireFox,Chrome,Opera],WhyNot); } );
				Old.addResponse("No", function(){ _c.talkLater(); } );
			this.addHelp(Old,true);
		
			var OutOfDate = new HelpText("Your current browser is out of date.<br><br>Can I show you some alternatives you might like better?");
				OutOfDate.addResponse("Yes", function(){ _c.say([FireFox,Chrome,Opera],WhyNot); } );
				OutOfDate.addResponse("No", function(){ _c.talkLater(); } );
			this.addHelp(OutOfDate,true);
		
			var Modern = new HelpText("Would you like to try a more modern browser?");
				Modern.addResponse("Yes", function() { _c.say([FireFox,Chrome,Opera],WhyNot); });
				Modern.addResponse("No", function() { _c.talkLater(); });
			this.addHelp(Modern,true);
		
			var FireFox = new HelpText("<b>Firefox</b> is a great standards compliant browser from Mozilla that is also free and open source!<br><br>Want to try it?");
				FireFox.addResponseURL("Yes", "http://www.firefox.com");
				FireFox.addResponse("No", function() { _c.say([Chrome,Opera],WhyNot); });
			this.addHelp(FireFox);
		
			var Chrome = new HelpText("<b>Chrome</b> is lightweight fast browser developed by Google!<br><br>Want to try it?");
				Chrome.addResponseURL("Yes", "http://www.google.com/chrome");
				Chrome.addResponse("No", function() { _c.say([FireFox,Opera],WhyNot); });
			this.addHelp(Chrome);
		
			var Opera = new HelpText("<b>Opera</b> is a browser focused on speed and memory usage.  Lots of people like it.<br><br>Want to give it a try?");
				Opera.addResponseURL("Yes", "http://www.opera.com");
				Opera.addResponse("No", function() { _c.say([FireFox,Chrome],WhyNot); });
			this.addHelp(Opera);
		
			var WhyNot = new HelpText("I hope you change your mind someday!");
				WhyNot.addTimeout(1000,function(){ _c.closeBubble(); });
			this.addHelp(WhyNot);
		
			// Click clippy
			var Ouch1 = new HelpText("Ouch!",true);
				Ouch1.addTimeout(1000,function(){ _c.closeBubble(); });
			this.addHelp(Ouch1);
		
			var Ouch2 = new HelpText("Ahhh My Face!!",true);
				Ouch2.addTimeout(1000,function(){ _c.closeBubble(); });
			this.addHelp(Ouch2);
		
			var Ouch3 = new HelpText("Don't hurt me no more!",true);
				Ouch3.addTimeout(1000,function(){ _c.closeBubble(); });
			this.addHelp(Ouch3);
		
			// initial wait
			this.talkLater(2000);
		
		}
		this.addHelp = function(_help, is_startphrase) {
			this.help[ _help.getKey() ] = _help;
			if (is_startphrase)
				this.firstlines.push( _help.getKey() );
		
			return;
		}
		this.sayOne = function(keys,alternative) {
		
			var found = false, count = 0;
			
			while(count < keys.length) {
				var choice = parseInt( Math.random() * keys.length );
				if( this.canSay( keys[choice]) ) {
					this.say(keys[choice]);
					return;
				}
				count ++;
			}
		
			if (alternative)
				this.say(alternative);
		
			return;
		}
		this.canSay = function(key) {
			return this.help[ key ].available();
		}
		this.say = function(key,alternative) {
		
			if (this.timer != false) {
				try {
					clearTimeout(this.timer);
					this.timer = false;
				} catch(e) {
					// alert(e);	
				}
			}
		
			if(typeof(key) !== "string" && key.length)
				this.sayOne(key,alternative);
		
			if (this.help[key])
				this.openBubble( this.help[ key ].toElements() );
		}
		this.firstLine = function() {
			this.sayOne(this.firstlines);	
		}
		this.talkLater = function(timeout) {
			this.closeBubble(); 
			var _c = this;
			this.timer = setTimeout( function() { _c.firstLine(); }, timeout ? timeout : (Math.random() * 3000 + 500));
		}
		this.openBubble = function(_o) {
		
			if (typeof(_o)=="string") {
				var o = document.createElement("p");
				o.innerHTML = _o;
			} else {
				var o = _o;
			}
		
			if (this.bubble) {
				this.bubble.close();
			}
		
			this.bubble = new PopupDisplay(o,{file_dir:this.file_dir});
			add(this.homebase,this.bubble.getElement());
		
		}
		this.closeBubble = function() {
			if (this.bubble) {
				this.bubble.close();
			}
		}
		this.update = function() {
			this.update_count++;
		}
		this.move = function(x,y) {
			this.character.move(x,y);
		}



		/**
		 * Have to do this here now that prototype is eliminated
		 */
		this.homebase = this.findHomeBase(_homeSelector);

		/**
		 * Maybe make this optional ?
		 */
		this.preload();
	}

	window.Clippy = Clippy;
	window.__clippyboot = __clippyboot;

})(window);