//$.getScript('mistbox_commands.js', function() {
//    console.log("script loaded!");
//});

var el;

$(document).ready(function () {
    console.log("ready!");
    el = {
        getTimeline: $('#get-timeline'),
        btnAction: $('#get-status'),
        btnClear: $('#clear_console'),
        input: $('#input'),
        result: $('#output')
    };

    $("#get-timeline").click(function () {
        getTimeline();
        
        
    });

    $("#get-status").click(function () {
        getData();
    });

    $("#clear_console").click(function () {
        $('#output').html('');
        $('#date-output').html('');
    });


});

function getData() {
    getStatus();
}

function getStatus() {

    var baseUrl = $('#stage_select').find(":selected").val();
    $('#date-output').html("UTC date now: " + moment.utc().format());
    var url = baseUrl + "/users/login";
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var data = {"email" : username , "password" : password};
    var token = ('Authorization', 'Basic' + btoa(username + ':' + password));
    $('#output').append("request " + url + "\n");
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        async: true,
        beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Basic ' + btoa(username + ':' + password));
        },
        success: function (res) {
            $('#output').append("response -> " + JSON.stringify(res) + "\n\n");
        },
        error: function (jqxhr) {
            $('#output').append("response " + JSON.stringify(jqxhr.responseText) + "\n\n");
        },
    });
}

function getTimeline() {

    var baseUrl = $('#stage_select').find(":selected").val();

    $('#date-output').html("UTC date now: " + moment.utc().format());

    var url = baseUrl + "/acunits/78505ce4-8336-430d-bb1a-0f7f97b03853/timeline/random";

    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var data = {"email" : username , "password" : password};

    $('#output').append("request " + url + "\n");
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        async: true,
        beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Basic ' + btoa(username + ':' + password));
        },
        success: function (res) {
            $('#output').append("response -> " + JSON.stringify(res) + "\n\n");
        },
        error: function (jqxhr) {
            $('#output').append("response " + JSON.stringify(jqxhr.responseText) + "\n\n");
        },
    });
    
}
