require("tfw.hash-watcher",function(n,t,r){var o=function(){function t(){return o(r,arguments)}var r={en:{}},o=n("$").intl;return t.all=r,t}(),a=n("tfw.listeners"),e="?random-hash."+Date.now(),i=0,s="",u=[],h=new a;t.exports=function(n){h.add(n),i||(i=window.setInterval(function(){var n=window.location.hash;if(e!=n){for(e=n,"#"==n.charAt(0)&&(n=n.substr(1)),s=n;"/"==n.charAt(0);)n=n.substr(1);u=n.split("/"),h.fire(u,window.location.hash)}},50))},t.exports.args=function(){return u},t.exports.hash=function(){return s},t.exports._=o});
//# sourceMappingURL=tfw.hash-watcher.js.map