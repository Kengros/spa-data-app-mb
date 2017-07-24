//$.getScript('mistbox_commands.js', function() {
//    console.log("script loaded!");
//});
var el;

$(document).ready(function () {
    console.log("ready!");
    el = {
        btnAction: $('#get-status'),
        btnClear: $('#clear_console'),
        input: $('#input'),
        result: $('#output')
    };

    $("#get-status").click(function () {
        getData();
    });

    $("#clear_console").click(function () {
        $('#output').html('');
        $('#date-output').html('');
        $('#commands_output').html('');
        $('#ac_output').html('');
    });


});

function showResp(res) {
    // var o;
    // try {
    //     o = JSON.parse(res);
    // } catch (e) {
    //     alert('not valid response');
    //     return;
    // }
    var node = new PrettyJSON.view.Node({
        el: el.result,
        data: res
    });

}

function getData() {
    getStatus();
    getCommands();
    getAc();
}

function getCommands() {
    var serial = $('#serial-number').val();
    var baseUrl = $('#stage_select').find(":selected").val();
    var url = baseUrl + "/devices/" + serial + "/commands";
    $('#output').append("request " + url + "\n");
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        async: true,
        success: function (res) {
            var node2 = new PrettyJSON.view.Node({
                el: $('#commands_output'),
                data: res
            });
        },
        error: function (jqxhr) {
            $('#commands_output').append("response " + JSON.stringify(jqxhr.responseText) + "\n\n");
        }
    });
}

function getAc() {
    var serialNumber = $('#serial-number').val();
    var baseUrl = $('#stage_select').find(":selected").val();
    var url = baseUrl + "/acunits/bydevice/" + serialNumber;
    $('#output').append("request " + url + "\n");
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        async: true,
        success: function (res) {
            var node3 = new PrettyJSON.view.Node({
                el: $('#ac_output'),
                data: res
            });
        },
        error: function (jqxhr) {
            $('#ac_output').append("response " + JSON.stringify(jqxhr.responseText) + "\n\n");
        }
    });
}

function getStatus() {
    var serialNumber = $('#serial-number').val();

    if (!serialNumber || 0 == serialNumber.trim().length) {
        alert("no serial number set");
        return
    }
    var baseUrl = $('#stage_select').find(":selected").val();

    $('#date-output').html("UTC date now: " + moment.utc().format());

    var serial = encodeURIComponent(serialNumber.replace(/\s+/g, ''));
    var url = baseUrl + "/devices/" + serial + "/full_info";

    $('#output').append("request " + url + "\n");

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        async: true,
        success: function (res) {
            // $('#output').append("response -> " + JSON.stringify(res) + "\n\n");
            showResp(res);
        },
        error: function (jqxhr) {
            $('#output').append("response " + JSON.stringify(jqxhr.responseText) + "\n\n");
        }
    });
}

function updateParamDesc() {
    var command = Commands[$("#command_select").find("option:selected").index()];
    $('#param_desc').text(command.parameterDesc);
}