define(['viewmodels/shell', 'services/displayService'], function (shell, displayService) {

    this.success = ko.observable();
    this.message = ko.observable();
    this.skips = ko.observable();
    this.total_qsos = ko.observable();
   
    var vm = {
        activate: function (context) {
            success(context.success == "true" ? "Success" : "Failed");
            message(context.msg);
            skips(context.skips);
            total_qsos(context.rec_counter);
        },
        compositionComplete: function () {
            //displayService.display(message());
        },

        shell: shell,
        success: success,
        message: message,
        skips: skips,
        total_qsos: total_qsos
    };
    return vm;
});