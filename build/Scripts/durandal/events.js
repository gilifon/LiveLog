define(["durandal/system"],function(g){var e=/\s+/,n=function(){},a=function(g,e){this.owner=g,this.events=e};return a.prototype.then=function(g,e){return this.callback=g||this.callback,this.context=e||this.context,this.callback?(this.owner.on(this.events,this.callback,this.context),this):this},a.prototype.on=a.prototype.then,a.prototype.off=function(){return this.owner.off(this.events,this.callback,this.context),this},n.prototype.on=function(g,n,o){var L,t,s;if(n){for(L=this.callbacks||(this.callbacks={}),g=g.split(e);t=g.shift();)s=L[t]||(L[t]=[]),s.push(n,o);return this}return new a(this,g)},n.prototype.off=function(n,a,o){var L,t,s,l;if(!(t=this.callbacks))return this;if(!(n||a||o))return delete this.callbacks,this;for(n=n?n.split(e):g.keys(t);L=n.shift();)if((s=t[L])&&(a||o))for(l=s.length-2;l>=0;l-=2)a&&s[l]!==a||o&&s[l+1]!==o||s.splice(l,2);else delete t[L];return this},n.prototype.trigger=function(g){var n,a,o,L,t,s,l,p;if(!(a=this.callbacks))return this;for(p=[],g=g.split(e),L=1,t=arguments.length;t>L;L++)p[L-1]=arguments[L];for(;n=g.shift();){if((l=a.all)&&(l=l.slice()),(o=a[n])&&(o=o.slice()),o)for(L=0,t=o.length;t>L;L+=2)o[L].apply(o[L+1]||this,p);if(l)for(s=[n].concat(p),L=0,t=l.length;t>L;L+=2)l[L].apply(l[L+1]||this,s)}return this},n.prototype.proxy=function(g){var e=this;return function(n){e.trigger(g,n)}},n.includeIn=function(g){g.on=n.prototype.on,g.off=n.prototype.off,g.trigger=n.prototype.trigger,g.proxy=n.prototype.proxy},n});