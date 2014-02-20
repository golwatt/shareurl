var records = new Array();
var TIME_OUT = 30000; // equal 30 second (unit: ms)

exports.Record = {
	createNew: function () {
		var record = {};
		record.url = '';
		record.timestamp = 0;
		return record;
	}
};

exports.isKeyUsed = function (key) {
	if (typeof records[key] == 'undefined')
		return false;

	if (!records[key].url)
		return false;

	var now = Date.now();
	if ((now - records[key].timestamp) >= TIME_OUT)
		return false;
	else
		return true;
}

exports.setRecord = function (key, record) {
	records[key] = record;
}

exports.clearRecord = function (key) {
	records[key].url = '';
	records[key].timestamp = 0;
}

exports.getRecord = function (key) {
	return records[key];
}