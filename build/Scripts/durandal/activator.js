define(["durandal/system","knockout"],function(g,e){function n(g){return void 0==g&&(g={}),g.closeOnDeactivate||(g.closeOnDeactivate=p.defaults.closeOnDeactivate),g.beforeActivate||(g.beforeActivate=p.defaults.beforeActivate),g.afterDeactivate||(g.afterDeactivate=p.defaults.afterDeactivate),g.affirmations||(g.affirmations=p.defaults.affirmations),g.interpretResponse||(g.interpretResponse=p.defaults.interpretResponse),g.areSameItem||(g.areSameItem=p.defaults.areSameItem),g}function a(e,n,a){return g.isArray(a)?e[n].apply(e,a):e[n](a)}function o(e,n,a,o,L){if(e&&e.deactivate){g.log("Deactivating",e);var t;try{t=e.deactivate(n)}catch(s){return g.error(s),o.resolve(!1),void 0}t&&t.then?t.then(function(){a.afterDeactivate(e,n,L),o.resolve(!0)},function(e){g.log(e),o.resolve(!1)}):(a.afterDeactivate(e,n,L),o.resolve(!0))}else e&&a.afterDeactivate(e,n,L),o.resolve(!0)}function L(e,n,o,L){if(e)if(e.activate){g.log("Activating",e);var t;try{t=a(e,"activate",L)}catch(s){return g.error(s),o(!1),void 0}t&&t.then?t.then(function(){n(e),o(!0)},function(e){g.log(e),o(!1)}):(n(e),o(!0))}else n(e),o(!0);else o(!0)}function t(e,n,a){return a.lifecycleData=null,g.defer(function(o){if(e&&e.canDeactivate){var L;try{L=e.canDeactivate(n)}catch(t){return g.error(t),o.resolve(!1),void 0}L.then?L.then(function(g){a.lifecycleData=g,o.resolve(a.interpretResponse(g))},function(e){g.error(e),o.resolve(!1)}):(a.lifecycleData=L,o.resolve(a.interpretResponse(L)))}else o.resolve(!0)}).promise()}function s(e,n,o,L){return o.lifecycleData=null,g.defer(function(t){if(e==n())return t.resolve(!0),void 0;if(e&&e.canActivate){var s;try{s=a(e,"canActivate",L)}catch(l){return g.error(l),t.resolve(!1),void 0}s.then?s.then(function(g){o.lifecycleData=g,t.resolve(o.interpretResponse(g))},function(e){g.error(e),t.resolve(!1)}):(o.lifecycleData=s,t.resolve(o.interpretResponse(s)))}else t.resolve(!0)}).promise()}function l(a,l){var p,m=e.observable(null);l=n(l);var w=e.computed({read:function(){return m()},write:function(g){w.viaSetter=!0,w.activateItem(g)}});return w.__activator__=!0,w.settings=l,l.activator=w,w.isActivating=e.observable(!1),w.canDeactivateItem=function(g,e){return t(g,e,l)},w.deactivateItem=function(e,n){return g.defer(function(g){w.canDeactivateItem(e,n).then(function(a){a?o(e,n,l,g,m):(w.notifySubscribers(),g.resolve(!1))})}).promise()},w.canActivateItem=function(g,e){return s(g,m,l,e)},w.activateItem=function(e,n){var a=w.viaSetter;return w.viaSetter=!1,g.defer(function(t){if(w.isActivating())return t.resolve(!1),void 0;w.isActivating(!0);var s=m();return l.areSameItem(s,e,p,n)?(w.isActivating(!1),t.resolve(!0),void 0):(w.canDeactivateItem(s,l.closeOnDeactivate).then(function(r){r?w.canActivateItem(e,n).then(function(r){r?g.defer(function(g){o(s,l.closeOnDeactivate,l,g)}).promise().then(function(){e=l.beforeActivate(e,n),L(e,m,function(g){p=n,w.isActivating(!1),t.resolve(g)},n)}):(a&&w.notifySubscribers(),w.isActivating(!1),t.resolve(!1))}):(a&&w.notifySubscribers(),w.isActivating(!1),t.resolve(!1))}),void 0)}).promise()},w.canActivate=function(){var g;return a?(g=a,a=!1):g=w(),w.canActivateItem(g)},w.activate=function(){var g;return a?(g=a,a=!1):g=w(),w.activateItem(g)},w.canDeactivate=function(g){return w.canDeactivateItem(w(),g)},w.deactivate=function(g){return w.deactivateItem(w(),g)},w.includeIn=function(g){g.canActivate=function(){return w.canActivate()},g.activate=function(){return w.activate()},g.canDeactivate=function(g){return w.canDeactivate(g)},g.deactivate=function(g){return w.deactivate(g)}},l.includeIn?w.includeIn(l.includeIn):a&&w.activate(),w.forItems=function(e){l.closeOnDeactivate=!1,l.determineNextItemToActivate=function(g,e){var n=e-1;return-1==n&&g.length>1?g[1]:n>-1&&n<g.length-1?g[n]:null},l.beforeActivate=function(g){var n=w();if(g){var a=e.indexOf(g);-1==a?e.push(g):g=e()[a]}else g=l.determineNextItemToActivate(e,n?e.indexOf(n):0);return g},l.afterDeactivate=function(g,n){n&&e.remove(g)};var n=w.canDeactivate;w.canDeactivate=function(a){return a?g.defer(function(g){function n(){for(var e=0;e<L.length;e++)if(!L[e])return g.resolve(!1),void 0;g.resolve(!0)}for(var o=e(),L=[],t=0;t<o.length;t++)w.canDeactivateItem(o[t],a).then(function(g){L.push(g),L.length==o.length&&n()})}).promise():n()};var a=w.deactivate;return w.deactivate=function(n){return n?g.defer(function(g){function a(a){w.deactivateItem(a,n).then(function(){L++,e.remove(a),L==t&&g.resolve()})}for(var o=e(),L=0,t=o.length,s=0;t>s;s++)a(o[s])}).promise():a()},w},w}var p,m={closeOnDeactivate:!0,affirmations:["yes","ok","true"],interpretResponse:function(n){return g.isObject(n)&&(n=n.can||!1),g.isString(n)?-1!==e.utils.arrayIndexOf(this.affirmations,n.toLowerCase()):n},areSameItem:function(g,e){return g==e},beforeActivate:function(g){return g},afterDeactivate:function(g,e,n){e&&n&&n(null)}};return p={defaults:m,create:l,isActivator:function(g){return g&&g.__activator__}}});