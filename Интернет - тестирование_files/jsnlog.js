/* 
 * JSNLog 2.28.0
 * Open source under the MIT License.
 * Copyright 2012-2017 Mattijs Perdeck All rights reserved.
 */
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,f){a!=Array.prototype&&a!=Object.prototype&&(a[c]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,f,e){if(c){f=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var k=a[e];k in f||(f[k]={});f=f[k]}a=a[a.length-1];e=f[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Object.setPrototypeOf",function(a){return a?a:"object"!=typeof"".__proto__?null:function(a,f){a.__proto__=f;if(a.__proto__!==f)throw new TypeError(a+" is not extensible");return a}},"es6","es5");
var __extends=this&&this.__extends||function(){var a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,f){a.__proto__=f}||function(a,f){for(var c in f)f.hasOwnProperty(c)&&(a[c]=f[c])};return function(c,f){function e(){this.constructor=c}a(c,f);c.prototype=null===f?Object.create(f):(e.prototype=f.prototype,new e)}}();
function JL(a){if(!a)return JL.__;Array.prototype.reduce||(Array.prototype.reduce=function(a,c){for(var f=c,e=0;e<this.length;e++)f=a(f,this[e],e,this);return f});var c="";return("."+a).split(".").reduce(function(a,e,k,n){c=c?c+("."+e):e;e=a["__"+c];void 0===e&&(JL.Logger.prototype=a,e=new JL.Logger(c),a["__"+c]=e);return e},JL.__)}
(function(a){function c(a,b,g){void 0!==b[a]&&(null===b[a]?delete g[a]:g[a]=b[a])}function f(d){if(null!=a.enabled&&!a.enabled)return!1;try{if(d.userAgentRegex&&!(new RegExp(d.userAgentRegex)).test(navigator.userAgent))return!1}catch(b){}try{if(d.ipRegex&&a.clientIP&&!(new RegExp(d.ipRegex)).test(a.clientIP))return!1}catch(b){}return!0}function e(a,b){try{if(a.disallow&&(new RegExp(a.disallow)).test(b))return!1}catch(g){}return!0}function k(a){return"function"==typeof a?a instanceof RegExp?a.toString():
a():a}function n(d){d=k(d);switch(typeof d){case "string":return new l(d,null,d);case "number":var b=d.toString();return new l(b,null,b);case "boolean":return b=d.toString(),new l(b,null,b);case "undefined":return new l("undefined",null,"undefined");case "object":if(d instanceof RegExp||d instanceof String||d instanceof Number||d instanceof Boolean)return b=d.toString(),new l(b,null,b);b="function"===typeof a.serialize?a.serialize.call(this,d):JSON.stringify(d);return new l("",d,b);default:return new l("unknown",
null,"unknown")}}function r(d,b,g){a.entryId++;return new t(d,b,g,a._getTime(),a.entryId)}function u(a){a.id&&(clearTimeout(a.id),a.id=null)}function v(a,b,g){var d=this;a.id||(a.id=setTimeout(function(){g.call(d)},b))}a.requestId="";a.entryId=0;a._createXMLHttpRequest=function(){return new XMLHttpRequest};a._getTime=function(){return(new Date).getTime()};a._console=console;a._appenderNames=[];var l=function(){return function(a,b,g){this.msg=a;this.meta=b;this.finalString=g}}();a.setOptions=function(a){c("enabled",
a,this);c("maxMessages",a,this);c("defaultAjaxUrl",a,this);c("clientIP",a,this);c("requestId",a,this);c("defaultBeforeSend",a,this);c("serialize",a,this);return this};a.getAllLevel=function(){return-2147483648};a.getTraceLevel=function(){return 1E3};a.getDebugLevel=function(){return 2E3};a.getInfoLevel=function(){return 3E3};a.getWarnLevel=function(){return 4E3};a.getErrorLevel=function(){return 5E3};a.getFatalLevel=function(){return 6E3};a.getOffLevel=function(){return 2147483647};var h=function(){return function(a,
b){this.inner=b;this.name="JL.Exception";this.message=n(a).finalString}}();a.Exception=h;h.prototype=Error();var t=function(){return function(a,b,g,c,f){this.l=a;this.m=b;this.n=g;this.t=c;this.u=f}}();a.LogItem=t;h=function(){function d(b,g){this.appenderName=b;this.sendLogItems=g;this.level=a.getTraceLevel();this.sendWithBufferLevel=2147483647;this.storeInBufferLevel=-2147483648;this.bufferSize=0;this.batchSize=1;this.maxBatchSize=20;this.batchTimeout=2147483647;this.sendTimeout=5E3;this.buffer=
[];this.batchBuffer=[];this.batchTimeoutTimer={id:null};this.sendTimeoutTimer={id:null};this.nbrLogItemsBeingSent=this.nbrLogItemsSkipped=0;if(void 0==b)throw"Trying to create an appender without a name or with an empty name";if(-1!=a._appenderNames.indexOf(b)){if(!b)throw"Trying to create an appender without a name or with an empty name";throw"Multiple appenders use the same name "+b;}a._appenderNames.push(b)}d.prototype.addLogItemsToBuffer=function(b){if(this.batchBuffer.length>=this.maxBatchSize)this.nbrLogItemsSkipped+=
b.length;else{if(null!=a.maxMessages){if(1>a.maxMessages)return;a.maxMessages-=b.length}this.batchBuffer=this.batchBuffer.concat(b);var g=this;v(this.batchTimeoutTimer,this.batchTimeout,function(){g.sendBatch.call(g)})}};d.prototype.batchBufferHasOverdueMessages=function(){for(var b=0;b<this.batchBuffer.length;b++)if(a._getTime()-this.batchBuffer[b].t>this.batchTimeout)return!0;return!1};d.prototype.batchBufferHasStrandedMessage=function(){return null!=a.maxMessages&&1>a.maxMessages&&0<this.batchBuffer.length};
d.prototype.sendBatchIfComplete=function(){(this.batchBuffer.length>=this.batchSize||this.batchBufferHasOverdueMessages()||this.batchBufferHasStrandedMessage())&&this.sendBatch()};d.prototype.onSendingEnded=function(){u(this.sendTimeoutTimer);this.nbrLogItemsBeingSent=0;this.sendBatchIfComplete()};d.prototype.setOptions=function(b){c("level",b,this);c("ipRegex",b,this);c("userAgentRegex",b,this);c("disallow",b,this);c("sendWithBufferLevel",b,this);c("storeInBufferLevel",b,this);c("bufferSize",b,this);
c("batchSize",b,this);c("maxBatchSize",b,this);c("batchTimeout",b,this);c("sendTimeout",b,this);this.bufferSize<this.buffer.length&&(this.buffer.length=this.bufferSize);if(this.maxBatchSize<this.batchSize)throw new a.Exception({message:"maxBatchSize cannot be smaller than batchSize",maxBatchSize:this.maxBatchSize,batchSize:this.batchSize});return this};d.prototype.log=function(a,g,d,c,m,w,h){!f(this)||!e(this,w)||m<this.storeInBufferLevel||(a=r(m,w,h),m<this.level?0<this.bufferSize&&(this.buffer.push(a),
this.buffer.length>this.bufferSize&&this.buffer.shift()):(this.addLogItemsToBuffer([a]),m>=this.sendWithBufferLevel&&this.buffer.length&&(this.addLogItemsToBuffer(this.buffer),this.buffer.length=0),this.sendBatchIfComplete()))};d.prototype.sendBatch=function(){if(!(0<this.nbrLogItemsBeingSent)&&(u(this.batchTimeoutTimer),0!=this.batchBuffer.length)){this.nbrLogItemsBeingSent=this.batchBuffer.length;var a=this;v(this.sendTimeoutTimer,this.sendTimeout,function(){a.onSendingEnded.call(a)});this.sendLogItems(this.batchBuffer,
function(){a.batchBuffer.splice(0,a.nbrLogItemsBeingSent);0<a.nbrLogItemsSkipped&&(a.batchBuffer.push(r(4E3,"Lost "+a.nbrLogItemsSkipped+" messages. Either connection with the server was down or logging was disabled via the enabled option. Reduce lost messages by increasing the ajaxAppender option maxBatchSize.",a.appenderName)),a.nbrLogItemsSkipped=0);a.onSendingEnded.call(a)})}};return d}();a.Appender=h;var p=function(d){function b(g){g=d.call(this,g,b.prototype.sendLogItemsAjax)||this;g.xhr=a._createXMLHttpRequest();
return g}__extends(b,d);b.prototype.setOptions=function(a){c("url",a,this);c("beforeSend",a,this);d.prototype.setOptions.call(this,a);return this};b.prototype.sendLogItemsAjax=function(b,d){try{if(f(this)){var g=this.xhr.readyState;0!=g&&4!=g&&this.xhr.abort();g="/jsnlog.logger";null!=a.defaultAjaxUrl&&(g=a.defaultAjaxUrl);this.url&&(g=this.url);this.xhr.open("POST",g);this.xhr.setRequestHeader("Content-Type","application/json");this.xhr.setRequestHeader("JSNLog-RequestId",a.requestId);var c=this;
this.xhr.onreadystatechange=function(){4==c.xhr.readyState&&200<=c.xhr.status&&300>c.xhr.status&&d()};var e={r:a.requestId,lg:b};"function"===typeof this.beforeSend?this.beforeSend.call(this,this.xhr,e):"function"===typeof a.defaultBeforeSend&&a.defaultBeforeSend.call(this,this.xhr,e);var h=JSON.stringify(e);this.xhr.send(h)}}catch(y){}};return b}(h);a.AjaxAppender=p;var q=function(c){function b(a){return c.call(this,a,b.prototype.sendLogItemsConsole)||this}__extends(b,c);b.prototype.clog=function(b){a._console.log(b)};
b.prototype.cerror=function(b){a._console.error?a._console.error(b):this.clog(b)};b.prototype.cwarn=function(b){a._console.warn?a._console.warn(b):this.clog(b)};b.prototype.cinfo=function(b){a._console.info?a._console.info(b):this.clog(b)};b.prototype.cdebug=function(b){a._console.debug?a._console.debug(b):this.cinfo(b)};b.prototype.sendLogItemsConsole=function(b,c){try{if(!f(this)||!a._console)return;var d;for(d=0;d<b.length;++d){var g=b[d],e=g.n+": "+g.m;"undefined"===typeof window&&(e=new Date(g.t)+
" | "+e);g.l<=a.getDebugLevel()?this.cdebug(e):g.l<=a.getInfoLevel()?this.cinfo(e):g.l<=a.getWarnLevel()?this.cwarn(e):this.cerror(e)}}catch(x){}c()};return b}(h);a.ConsoleAppender=q;h=function(){function a(a){this.loggerName=a;this.seenRegexes=[]}a.prototype.setOptions=function(a){c("level",a,this);c("userAgentRegex",a,this);c("disallow",a,this);c("ipRegex",a,this);c("appenders",a,this);c("onceOnly",a,this);this.seenRegexes=[];return this};a.prototype.buildExceptionObject=function(a){var b={};a.stack?
b.stack=a.stack:b.e=a;a.message&&(b.message=a.message);a.name&&(b.name=a.name);a.data&&(b.data=a.data);a.inner&&(b.inner=this.buildExceptionObject(a.inner));return b};a.prototype.log=function(a,c,d){var b=0;if(!this.appenders)return this;if(a>=this.level&&f(this)&&(d?(b=this.buildExceptionObject(d),b.logData=k(c)):b=c,c=n(b),e(this,c.finalString))){if(this.onceOnly)for(b=this.onceOnly.length-1;0<=b;){if((new RegExp(this.onceOnly[b])).test(c.finalString)){if(this.seenRegexes[b])return this;this.seenRegexes[b]=
!0}b--}c.meta=c.meta||{};for(b=this.appenders.length-1;0<=b;)this.appenders[b].log(1E3>=a?"trace":2E3>=a?"debug":3E3>=a?"info":4E3>=a?"warn":5E3>=a?"error":"fatal",c.msg,c.meta,function(){},a,c.finalString,this.loggerName),b--}return this};a.prototype.trace=function(a){return this.log(1E3,a)};a.prototype.debug=function(a){return this.log(2E3,a)};a.prototype.info=function(a){return this.log(3E3,a)};a.prototype.warn=function(a){return this.log(4E3,a)};a.prototype.error=function(a){return this.log(5E3,
a)};a.prototype.fatal=function(a){return this.log(6E3,a)};a.prototype.fatalException=function(a,c){return this.log(6E3,a,c)};return a}();a.Logger=h;a.createAjaxAppender=function(a){return new p(a)};a.createConsoleAppender=function(a){return new q(a)};h="undefined"!==typeof window?new p(""):new q("");a.__=new a.Logger("");a.__.setOptions({level:a.getDebugLevel(),appenders:[h]})})(JL||(JL={}));"undefined"!==typeof exports&&(exports.__esModule=!0,exports.JL=JL);var define;
"function"==typeof define&&define.amd&&define("jsnlog",[],function(){return JL});"function"==typeof __jsnlog_configure&&__jsnlog_configure(JL);"undefined"===typeof window||window.onerror||(window.onerror=function(a,c,f,e,k){JL("onerrorLogger").fatalException({msg:"Uncaught Exception",errorMsg:a,url:c,"line number":f,column:e},k);return!1});
"undefined"===typeof window||window.onunhandledrejection||(window.onunhandledrejection=function(a){JL("onerrorLogger").fatalException({msg:"unhandledrejection",errorMsg:a.reason?a.reason.message:a.message||null},a.reason)});
