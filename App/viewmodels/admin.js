define(['viewmodels/shell', 'services/displayService', 'services/utilities'], function (shell, displayService, utilities) {

    this.password = ko.observable("");
    this.authorized = ko.observable(false);

    this.Authenticate = function ()
    {
        if (password() == "") {
            authorized(false);
            displayService.display("אם אתה לא זוכר את הסיסמה, פנה לדני 4Z5SL או לגיל 4Z1KD", "error");
        }
        else {
            var p = utilities.base64Encode(password());
            if (p == "STcwaTEh") {
                authorized(true);
            }
            else {
                authorized(false);
                displayService.display("אם אתה לא זוכר את הסיסמה, פנה לדני 4Z5SL או לגיל 4Z1KD", "error");
            }
        }
    }

    var vm = {
        activate: function () {
            
        },
        compositionComplete: function () {
            
        },
        Authenticate: Authenticate,
        authorized: authorized,
        shell: shell
    };

    return vm;
});