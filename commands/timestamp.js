const { SlashCommandBuilder } = require('@discordjs/builders');

function checkTimeFormat (time) {
	const regexp = /(\d{1,2}):(\d{2})\s?([AP]M)?/gi;
	const matched = [...time.matchAll(regexp)];

	if (matched.length == 0) {
		return [false, false];
	} else {
		const hours = Math.min(parseInt(matched[0][1]), 24);
		const minutes = Math.min(parseInt(matched[0][2]), 59);

		if (matched[0][3] === undefined || matched[0][3].toUpperCase() == 'AM') {
			return [hours, minutes];
		} else if (matched[0][3].toUpperCase() == 'PM') {
			return [Math.min(hours + 12, 24), minutes];
		}
		
	}
};

function checkTimeZoneFormat (timezone) {
	const regexp = /UTC([+-])(\d{1,2}):(\d{2})/gi;
	const matched = [...timezone.matchAll(regexp)];

	if (matched.length == 0) {
		return [false, false];
	} else {
		const sign = (matched[0][1] == "+") ? 1 : -1;
		const hours = Math.min(parseInt(matched[0][2]), 24);
		const minutes = Math.min(parseInt(matched[0][3]), 59);
		return [hours * sign, minutes];
	}
};

function parseTime (time) {

};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timestamp')
		.setDescription('Helper command for making timestamps')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('The time of the timestamp.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('date')
				.setDescription('The date of the timestamp. Defaults to today.')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('month')
				.setDescription('The month of the timestamp. Defaults to this month.')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('year')
				.setDescription('The year of the timestamp. Defaults to this year.')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('timezone')
				.setDescription('The time zone of the timestamp, in hours ahead or behind UTC. Defaults to 0.')
				.setRequired(false)),
	async execute(interaction) {
		var timestamp = new Date(Date.now())

		const timeString = interaction.options.getString('time');
		const timezoneString = interaction.options.getString('timezone') ?? 'UTC+0:00';

		const [hours, minutes] = checkTimeFormat(timeString);
		const [timezoneHours, timezoneMinutes] = checkTimeZoneFormat(timezoneString);

		if (!hours) {
			interaction.reply(`Your time is formatted incorrectly! Format it as \`XX:XX AM/PM\`.`);
			return;
		}
		if (!timezoneHours) {
			interaction.reply(`Your timezone is formatted incorreectly! Format it as \`UTC+/-XX:XX\`.`);
			return;
		}

		interaction.reply(`All checks passed :)`);

	},
};
