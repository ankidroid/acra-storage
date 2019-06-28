function(newDoc, oldDoc, userCtx) {

    var MIN_APP_VERSION_CODE = 20804300;
    var ILLEGAL_VERSION_CODE = 20900199;
    var MIN_ANDROID_MAJOR = 4;

    if(userCtx.roles.indexOf("_admin") < 0 && userCtx.roles.indexOf("reporter") < 0 && userCtx.roles.indexOf("_writer") < 0) {
		throw({"unauthorized": "You may only post reports with reporter, _admin or _writer role "});
	}

    // Problem: Build.VERSION.RELEASE - "Do not assume that its value has any
    // particular structure or that values of RELEASE from different releases
    // can be somehow ordered."
    // (https://developer.android.com/reference/android/os/Build.VERSION.html#RELEASE)
    if(newDoc.ANDROID_VERSION) {
        var androidVersionParts = newDoc.ANDROID_VERSION.toString().split('.');
        if (androidVersionParts.length > 1 && androidVersionParts[0] < MIN_ANDROID_MAJOR) {
            throw({"forbidden": "Reports from Android version less than " + MIN_ANDROID_MAJOR + " are no longer allowed."});
        }
    }

    if(newDoc.APP_VERSION_CODE && newDoc.APP_VERSION_CODE < MIN_APP_VERSION_CODE && newDoc.APP_VERSION_CODE != ILLEGAL_VERSION_CODE) {
        throw({"forbidden": "Reports from application version code less than " + MIN_APP_VERSION_CODE + " or from " + ILLEGAL_VERSION_CODE + " are not allowed anymore."});
    }
}
