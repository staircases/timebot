const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkTimeFormat, checkTimeZoneFormat } = require('../helper_modules/timehelper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whenis')
		.setDescription('Tells you what a certain time translates to in your timezone.')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('The time to be translated')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('foreign timezone')
				.setDescription('The timezone of the inputted time as hours ahead or behind UTC. Defaults to 0.')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('local timezone')
				.setDescription('Your local timezone as hours ahead or behind UTC. Defaults to 0.')
				.setRequired(false)),
		async execute(interaction) {

			const timeString = interaction.options.getString('time');
			const fTimezone = interaction.options.getString('foreign timezone') ?? '+0:00';
			const lTimezone = interaction.options.getString('local timezone') ?? '+0:00';

			const [hours, minutes] = checkTimeFormat(timeString);
			const [fTimezoneHours, fTimezoneMinutes] = checkTimeZoneFormat(fTimezone);
			const [lTimezoneHours, lTimezoneMinutes] = checkTimeZoneFormat(lTimezone);

		},
};