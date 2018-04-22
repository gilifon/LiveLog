define(function (require) {
    
    var display = function (message, type) {
        toastr.options = {
            "positionClass": "toast-top-full-width",
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": 2500,
            "extendedTimeOut": 1000
        };

        switch (type) {
            case 'error':
                toastr.error(message, 'שגיאה!');
                break;
            case 'info':
                toastr.info(message, 'לידיעתך!');
                break;
            case 'warning':
                toastr.warning(message, 'אזהרה!');
                break;
            case 'Success':
                toastr.warning(message, 'יופי!');
                break;
            default:
                toastr.success(message, 'יופי!');
        }
    };

    return {
        display: display
    };

});