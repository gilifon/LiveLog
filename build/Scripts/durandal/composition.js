define(["durandal/system","durandal/viewLocator","durandal/binder","durandal/viewEngine","durandal/activator","jquery","knockout"],function(g,e,n,a,o,L,t){function s(g){for(var e=[],n={childElements:e,activeView:null},a=t.virtualElements.firstChild(g);a;)1==a.nodeType&&(e.push(a),a.getAttribute(v)&&(n.activeView=a)),a=t.virtualElements.nextSibling(a);return n.activeView||(n.activeView=e[0]),n}function l(){h--,0===h&&setTimeout(function(){for(var g=f.length;g--;)f[g]();f=[]},1)}function p(e,n,a){if(a)n();else if(e.activate&&e.model&&e.model.activate){var o;o=g.isArray(e.activationData)?e.model.activate.apply(e.model,e.activationData):e.model.activate(e.activationData),o&&o.then?o.then(n):o||void 0===o?n():l()}else n()}function m(){var e=this;e.activeView&&e.activeView.removeAttribute(v),e.child&&(e.model&&e.model.attached&&(e.composingNewView||e.alwaysTriggerAttach)&&e.model.attached(e.child,e.parent,e),e.attached&&e.attached(e.child,e.parent,e),e.child.setAttribute(v,!0),e.composingNewView&&e.model&&(e.model.compositionComplete&&u.current.complete(function(){e.model.compositionComplete(e.child,e.parent,e)}),e.model.detached&&t.utils.domNodeDisposal.addDisposeCallback(e.child,function(){e.model.detached(e.child,e.parent,e)})),e.compositionComplete&&u.current.complete(function(){e.compositionComplete(e.child,e.parent,e)})),l(),e.triggerAttach=g.noop}function w(e){if(g.isString(e.transition)){if(e.activeView){if(e.activeView==e.child)return!1;if(!e.child)return!0;if(e.skipTransitionOnSameViewId){var n=e.activeView.getAttribute("data-view"),a=e.child.getAttribute("data-view");return n!=a}}return!0}return!1}function i(g){for(var e=0,n=g.length,a=[];n>e;e++){var o=g[e].cloneNode(!0);a.push(o)}return a}function r(g){var e=i(g.parts),n=u.getParts(e),a=u.getParts(g.child);for(var o in n)L(a[o]).replaceWith(n[o])}function c(e){var n,a,o=t.virtualElements.childNodes(e);if(!g.isArray(o)){var L=[];for(n=0,a=o.length;a>n;n++)L[n]=o[n];o=L}for(n=1,a=o.length;a>n;n++)t.removeNode(o[n])}var u,d={},v="data-active-view",f=[],h=0,b="durandal-composition-data",y="data-part",A="["+y+"]",S=["model","view","transition","area","strategy","activationData"],C={complete:function(g){f.push(g)}};return u={convertTransitionToModuleId:function(g){return"transitions/"+g},defaultTransitionName:null,current:C,addBindingHandler:function(g,e,n){var a,o,L="composition-handler-"+g;e=e||t.bindingHandlers[g],n=n||function(){return void 0},o=t.bindingHandlers[g]={init:function(g,a,o,s,l){var p={trigger:t.observable(null)};return u.current.complete(function(){e.init&&e.init(g,a,o,s,l),e.update&&(t.utils.domData.set(g,L,e),p.trigger("trigger"))}),t.utils.domData.set(g,L,p),n(g,a,o,s,l)},update:function(g,e,n,a,o){var s=t.utils.domData.get(g,L);return s.update?s.update(g,e,n,a,o):(s.trigger(),void 0)}};for(a in e)"init"!==a&&"update"!==a&&(o[a]=e[a])},getParts:function(e){var n={};g.isArray(e)||(e=[e]);for(var a=0;a<e.length;a++){var o=e[a];if(o.getAttribute){var t=o.getAttribute(y);t&&(n[t]=o);for(var s=L(A,o).not(L("[data-bind] "+A,o)),l=0;l<s.length;l++){var p=s.get(l);n[p.getAttribute(y)]=p}}}return n},cloneNodes:i,finalize:function(e){if(e.transition=e.transition||this.defaultTransitionName,e.child||e.activeView)if(w(e)){var a=this.convertTransitionToModuleId(e.transition);g.acquire(a).then(function(g){e.transition=g,g(e).then(function(){if(e.cacheViews){if(e.activeView){var g=n.getBindingInstruction(e.activeView);void 0==g.cacheViews||g.cacheViews||t.removeNode(e.activeView)}}else e.child?c(e.parent):t.virtualElements.emptyNode(e.parent);e.triggerAttach()})}).fail(function(e){g.error("Failed to load transition ("+a+"). Details: "+e.message)})}else{if(e.child!=e.activeView){if(e.cacheViews&&e.activeView){var o=n.getBindingInstruction(e.activeView);void 0==o.cacheViews||o.cacheViews?L(e.activeView).hide():t.removeNode(e.activeView)}e.child?(e.cacheViews||c(e.parent),L(e.child).show()):e.cacheViews||t.virtualElements.emptyNode(e.parent)}e.triggerAttach()}else e.cacheViews||t.virtualElements.emptyNode(e.parent),e.triggerAttach()},bindAndShow:function(g,e,o){e.child=g,e.composingNewView=e.cacheViews?-1==t.utils.arrayIndexOf(e.viewElements,g):!0,p(e,function(){if(e.binding&&e.binding(e.child,e.parent,e),e.preserveContext&&e.bindingContext)e.composingNewView&&(e.parts&&r(e),L(g).hide(),t.virtualElements.prepend(e.parent,g),n.bindContext(e.bindingContext,g,e.model));else if(g){var o=e.model||d,s=t.dataFor(g);if(s!=o){if(!e.composingNewView)return L(g).remove(),a.createView(g.getAttribute("data-view")).then(function(g){u.bindAndShow(g,e,!0)}),void 0;e.parts&&r(e),L(g).hide(),t.virtualElements.prepend(e.parent,g),n.bind(o,g)}}u.finalize(e)},o)},defaultStrategy:function(g){return e.locateViewForObject(g.model,g.area,g.viewElements)},getSettings:function(e){var n,L=e(),s=t.utils.unwrapObservable(L)||{},l=o.isActivator(L);if(g.isString(s))return s=a.isViewUrl(s)?{view:s}:{model:s,activate:!0};if(n=g.getModuleId(s))return s={model:s,activate:!0};!l&&s.model&&(l=o.isActivator(s.model));for(var p in s)s[p]=-1!=t.utils.arrayIndexOf(S,p)?t.utils.unwrapObservable(s[p]):s[p];return l?s.activate=!1:void 0===s.activate&&(s.activate=!0),s},executeStrategy:function(g){g.strategy(g).then(function(e){u.bindAndShow(e,g)})},inject:function(n){return n.model?n.view?(e.locateView(n.view,n.area,n.viewElements).then(function(g){u.bindAndShow(g,n)}),void 0):(n.strategy||(n.strategy=this.defaultStrategy),g.isString(n.strategy)?g.acquire(n.strategy).then(function(g){n.strategy=g,u.executeStrategy(n)}).fail(function(e){g.error("Failed to load view strategy ("+n.strategy+"). Details: "+e.message)}):this.executeStrategy(n),void 0):(this.bindAndShow(null,n),void 0)},compose:function(n,a,o,L){h++,L||(a=u.getSettings(function(){return a},n));var t=s(n);a.activeView=t.activeView,a.parent=n,a.triggerAttach=m,a.bindingContext=o,a.cacheViews&&!a.viewElements&&(a.viewElements=t.childElements),a.model?g.isString(a.model)?g.acquire(a.model).then(function(e){a.model=g.resolveObject(e),u.inject(a)}).fail(function(e){g.error("Failed to load composed module ("+a.model+"). Details: "+e.message)}):u.inject(a):a.view?(a.area=a.area||"partial",a.preserveContext=!0,e.locateView(a.view,a.area,a.viewElements).then(function(g){u.bindAndShow(g,a)})):this.bindAndShow(null,a)}},t.bindingHandlers.compose={init:function(){return{controlsDescendantBindings:!0}},update:function(g,e,n,o,L){var s=u.getSettings(e,g);if(s.mode){var l=t.utils.domData.get(g,b);if(!l){var p=t.virtualElements.childNodes(g);l={},"inline"===s.mode?l.view=a.ensureSingleElement(p):"templated"===s.mode&&(l.parts=i(p)),t.virtualElements.emptyNode(g),t.utils.domData.set(g,b,l)}"inline"===s.mode?s.view=l.view.cloneNode(!0):"templated"===s.mode&&(s.parts=l.parts),s.preserveContext=!0}u.compose(g,s,L,!0)}},t.virtualElements.allowedBindings.compose=!0,u});