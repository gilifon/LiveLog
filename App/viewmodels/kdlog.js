define(['viewmodels/shell'], function (shell) {

    //properties
    this.linkList = ko.observableArray();
    this.callsign = ko.observable('');
    this.didNotWork = ko.observable(false);
    var that = this;

    this.GetWokedSections = function () {
        if (callsign() == "") return;
        $.ajax({
            type: "POST",
            url: "./Server/GetLogForCall.php",
            data: { 'info': { 'call': callsign() } }
        }).done(function (data) {
            linkList(data);
            didNotWork(false);
        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            linkList([]);
            didNotWork(true);
        });
    }

    this.IsSectionExist = function(section)
    {
        var queryResult = Enumerable.From(linkList).Where(function (x) { return x.section == section }).ToArray();
        return queryResult.length;
    }
    
    var vm = {
        activate: function () {
            //shell.selectedSubMenu('ham');
            shell.selectedMainMenu('sections');
        },
        compositionComplete: function () {
            jwerty.key('enter', function () {
                GetWokedSections();
            }, that);
        },
        linkList: linkList,
        callsign: callsign,
        didNotWork:didNotWork,
        shell: shell
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return vm;
});