function checkTimeFormat (time) {
	const regexp = /(\d{1,2}):(\d{2})\s?([AP]M)?/gi;
	const matched = [...time.matchAll(regexp)];

	if (matched.length == 0) {
		return [false, false];
	} else {
		const hours = Math.min(parseInt(matched[0][1]), 23);
		const minutes = Math.min(parseInt(matched[0][2]), 59);

		if (matched[0][3] === undefined || matched[0][3].toUpperCase() == 'AM') {
			return [hours, minutes];
		} else if (matched[0][3].toUpperCase() == 'PM') {
			return [Math.min(hours + 12, 24), minutes];
		}
		
	}
};

function checkTimeZoneFormat (timezone) {
	const regexp = /([+-])(\d{1,2}):(\d{2})/gi;
	const matched = [...timezone.matchAll(regexp)];

	if (matched.length == 0) {
		return [false, false];
	} else {
		const sign = (matched[0][1] == "+") ? 1 : -1;
		const hours = Math.min(parseInt(matched[0][2]), 23);
		const minutes = Math.min(parseInt(matched[0][3]), 59);
		return [hours * sign, minutes];
	}
};

module.exports = {
	checkTimeFormat, checkTimeZoneFormat
}