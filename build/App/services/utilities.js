define(function(){base64Keys="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",base64Encode=function(g){var e,n,o,a,L,t,s,p,l;for(l="",p=0,g=utf8Encode(g);p<g.length;)e=g.charCodeAt(p++),n=g.charCodeAt(p++),o=g.charCodeAt(p++),a=e>>2,L=(3&e)<<4|n>>4,t=(15&n)<<2|o>>6,s=63&o,isNaN(n)?t=s=64:isNaN(o)&&(s=64),l=""+l+base64Keys.charAt(a)+base64Keys.charAt(L)+(64>t?base64Keys.charAt(t):"")+(64>s?base64Keys.charAt(s):"");return l},utf8Encode=function(g){var e,n,o,a,L,t;for(g=g.replace(/\r\n/g,"\n"),o="",t=g.split(""),a=0,L=t.length;L>a;a++)n=t[a],e=n.charCodeAt(0),128>e?o+=String.fromCharCode(e):e>127&&2048>e?(o+=String.fromCharCode(192|e>>6),o+=String.fromCharCode(128|63&e)):(o+=String.fromCharCode(224|e>>12),o+=String.fromCharCode(128|63&e>>6),o+=String.fromCharCode(128|63&e));return o};var g=function(g,e){var n=e.toLowerCase();$(g).each(function(){$(this).text().toLowerCase().indexOf(n)<0?$(this).hide():$(this).show()})},e=function(g,e,n){try{var o=jQuery.parseJSON(g.responseText).error;alert("There was an error: "+o)}catch(a){alert(n)}},n=function(g,e){var n=g+":"+e,o=base64Encode(n);return o},o={base64Encode:base64Encode,getBase64Auth:n,applyRowSearch:g,handleError:e};return o});