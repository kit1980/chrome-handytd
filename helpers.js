function addOption(selectID, display, value) {
    var obj = document.getElementById(selectID);
    obj.options[obj.options.length] = new Option(display, value);
}


/**
 * Removes duplicates in the array 'a'
 * @author Johan Känngård, http://dev.kanngard.net
 */
function unique(a) {
    tmp = new Array(0);
    for(i=0;i<a.length;i++){
	if(!contains(tmp, a[i])){
	    tmp.length+=1;
	    tmp[tmp.length-1]=a[i];
	}
    }
    return tmp;
}

/**
 * Returns true if 's' is contained in the array 'a'
 * @author Johan Känngård, http://dev.kanngard.net
 */
function contains(a, e) {
    for(j=0;j<a.length;j++)if(a[j]==e)return true;
    return false;
}


function populate_timezones_select(select_id) {
    var tzs = [];
    for (var tz in timezoneJS.timezone.zones) {
        if (tz !== "null") tzs.push(tz);
    }
    tzs.sort();
    for (var i in tzs) {
        addOption(select_id, tzs[i], tzs[i]);
    }
}