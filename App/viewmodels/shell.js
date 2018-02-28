define(['plugins/router', 'durandal/app'], function (router, app) {

    
    var selectedSubMenu = ko.observable('');
    var selectedMainMenu = ko.observable('main');
    var version = app.version;
    var lang = ko.observable('en');

    this.toggleLanguage = function()
    {
        if (lang() == 'en') {
            lang('he');
        }
        else if (lang() == 'he') {
            lang('en');
        }
    }
    
    return {
        selectedSubMenu: selectedSubMenu,
        selectedMainMenu: selectedMainMenu,
        version: version,
        router: router,
        lang:lang,
        activate: function () {
            router.map([
                { route: '', title: 'IARC', moduleId: 'viewmodels/kdlog', nav: true },
                { route: 'Audit', title: 'Audit', moduleId: 'viewmodels/kdaudit', nav: true },                
            ]).buildNavigationModel();

            return router.activate();
        },
        compositionComplete: function () {
            $("#loadingImage").hide();
        }
    };
});