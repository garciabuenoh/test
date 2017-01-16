//Using Boostrap Alerts
bootstrap_alert = function () {}
bootstrap_alert.warning = function (message, alert, timeout) {
    $('<div id="floating_alert" class="alert alert-' + alert + ' fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + message + '&nbsp;&nbsp;</div>').appendTo('body');


    setTimeout(function () {
        $(".alert").alert('close');
    }, timeout);

}