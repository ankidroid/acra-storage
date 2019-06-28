function(newDoc, oldDoc, userCtx) {

    var MIN_APP_VERSION_CODE = 20804300;
    var ILLEGAL_VERSION_CODE = 20900199;

    if(userCtx.roles.indexOf("_admin") < 0 && userCtx.roles.indexOf("reporter") < 0 && userCtx.roles.indexOf("_writer") < 0) {
		throw({"unauthorized": "You may only post reports with reporter, _admin or _writer role "});
	}

    if(newDoc.APP_VERSION_CODE && newDoc.APP_VERSION_CODE < MIN_APP_VERSION_CODE && newDoc.APP_VERSION_CODE != ILLEGAL_VERSION_CODE) {
        throw({"forbidden": "Reports from application version code less than " + MIN_APP_VERSION_CODE + " or from " + ILLEGAL_VERSION_CODE + " are not allowed anymore."});
    }
}
