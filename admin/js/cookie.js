
function checkToken() {
	makeRequest("/auth",
		{token: getAppToken()},
		function (res) {
			if (res != 'OK')
				redirectToLogin();
		},
		function () {redirectToLogin();});
}

function redirectToLogin() {
	window.location.href = '/';
}

function setAppToken(token) {
	createCookie("token",token,1);
}

function getAppToken() {
	return readCookie("token");
}

function setAppUrl(url) {
	createCookie("url",url,365);
}

function getAppUrl() {
	return "https://"+readCookie("url");
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function makeRequest(endpoint, data, success, error) {
	$.ajax({
		url: getAppUrl()+endpoint,
		data: data,
		type: "POST",
		timeout: 5000,
		success: success,
		error: error
	});
}