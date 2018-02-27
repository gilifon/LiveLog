define(['viewmodels/shell'], function (shell) {

    //properties
    this.linkList = ko.observableArray();
    var that = this;
        
    var vm = {
        activate: function () {
            $.ajax({
                type: "POST",
                url: "./Server/GetAudit.php",
            }).done(function (data) {
                linkList(data);
            }).error(function (xhr, ajaxOptions, thrownError) {
                //alert(jQuery.parseJSON(xhr.responseText).error);
                linkList([]);
            });
        },
        compositionComplete: function () {
            
        },
        linkList: linkList,
        shell: shell
    };

    return vm;
});