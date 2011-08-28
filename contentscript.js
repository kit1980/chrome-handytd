// TODO: more time/date formats, maybe get from date.js
var regex = /(\d\d\.\d\d\.\d\d\d\d)\s(\d\d):(\d\d)\s?(am|pm|a\.m\.|p\.m\.)?/gi;

var need_to_set_timezone = false;

if (regex.test(document.body.innerText)) { // if times/dates found
    chrome.extension.sendRequest({method: "getLocalStorage"}, function(response) {
        options = response.data;

        if (options[document.location.host + "_timezone"]) { // if timezone for the page already set

            var dates = document.body.innerText.match(regex);
            dates = unique(dates);

            for (var i in dates) {

                var dtA = new timezoneJS.Date();
                dtA.setFromDateObjProxy(Date.parse(dates[i]), false);
                dtA.setTimezone(options[document.location.host + "_timezone"]);
                dtA.convertToTimezone(options["user_timezone"]);
                dates[i] = dates[i].replace(/\n/g, "<br>");
                var re = new RegExp(dates[i], "g");
                document.body.innerHTML = document.body.innerHTML.replace(re, dates[i] + "<br>(" + 
                                                                          (new Date(dtA.getTime())).toString('dddd, MMMM d, yyyy HH:mm') 
                                                                          + ", " + dtA.getTimezone() + ")");
            }
        } else {
        }

    });
} 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    sendResponse({});
});