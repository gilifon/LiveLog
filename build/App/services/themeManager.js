define(function(){var g="style",e=30,n=function(n){var o,L;for(o=0,L=document.getElementsByTagName("link");o<L.length;o++)-1!=L[o].rel.indexOf("stylesheet")&&L[o].title&&(L[o].disabled=!0,L[o].title==n&&(L[o].disabled=!1)),a(g,n,e)},o=function(){var e=L(g);e.length&&n(e)},a=function(g,e,n,o){var a=o?"; domain="+o:"";document.cookie=g+"="+encodeURIComponent(e)+"; max-age="+86400*n+"; path=/"+a},L=function(g){var e=document.cookie;if(0!=e.length){e.match("(^|;)[s]*"+g+"=([^;]*)");var n=e.match(g+"=([^;]*)");return decodeURIComponent(n[1])}return""},t={switch_style:n,set_style_from_cookie:o};return t});