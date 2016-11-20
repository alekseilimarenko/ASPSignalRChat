$(function () {

    $('#loginBlock').show();
    $('#chatBody').hide();

    var chat = $.connection.chatHub;
    

    chat.client.addMessage = function (name, message, time) {

        $('#chatroom').append('<p><b>' + htmlEncode(name)
            + '</b>: ' + htmlEncode(message) + '<br/>' + htmlEncode(getTimeNow()) + '</p>');
    };

    chat.client.onConnected = function (id, userName, allUsers) {

        $('#chatBody').show();
        $('#loginBlock').hide();
        $('#hdId').val(id);
        $('#username').val(userName);
        $('#header').html('<h3>Добро пожаловать, ' + userName + '</h3>');

        for (var i = 0; i < allUsers.length; i++) {

            AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
        }
    }

    chat.client.onNewUserConnected = function (id, name) {

        AddUser(id, name);
    }

    chat.client.onUserDisconnected = function (id) {

        $('#' + id).remove();
    }

    $.connection.hub.start().done(function () {

        $('#sendmessage').click(function () {
            chat.server.send($('#username').val(), $('#message').val(), getTimeNow());
            $('#message').val('');
            getTimeNow();
        });

        $('#btnLogin').click(function () {

            var name = $('#txtUserName').val();
            if (name.length > 0) {
                chat.server.connect(name);
            }
            else {
                alert("Введите имя");
            }
        });
    });
});

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}

function AddUser(id, name) {

    var userId = $('#hdId').val();

    if (userId != id) {

        $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
    }
}

function getTimeNow() {

    var date = new Date();
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    return date.toLocaleString("ru", options);
}