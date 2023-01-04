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
			option.setName('foreign-timezone')
				.setDescription('The timezone of the inputted time as hours ahead or behind UTC. Defaults to 0.')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('local-timezone')
				.setDescription('Your local timezone as hours ahead or behind UTC. Defaults to 0.')
				.setRequired(false)),
	async execute(interaction) {
		const timeString = interaction.options.getString('time');
		const fTimezone = interaction.options.getString('foreign-timezone') ?? '+0:00';
		const lTimezone = interaction.options.getString('local-timezone') ?? '+0:00';

		const [hours, minutes] = checkTimeFormat(timeString);
		const [fTimezoneHours, fTimezoneMinutes] = checkTimeZoneFormat(fTimezone);
		const [lTimezoneHours, lTimezoneMinutes] = checkTimeZoneFormat(lTimezone);

		if (!hours && hours !== 0) {
		interaction.reply(`Your time is formatted incorrectly! Format it as \`XX:XX AM/PM\`.`);
		return;
		}
		if (!fTimezoneHours && fTimezoneHours !== 0) {
			interaction.reply(`Your foreign timezone is formatted incorreectly! Format it as \`+/-XX:XX\`.`);
			return;
		}
		if (!lTimezoneHours && lTimezoneHours !== 0) {
			interaction.reply(`Your local timezone is formatted incorreectly! Format it as \`+/-XX:XX\`.`);
			return;
		}

		const hoursDiff = lTimezoneHours - fTimezoneHours + Math.trunc( (lTimezoneMinutes - fTimezoneMinutes) / 60 );
		const minutesDiff = (lTimezoneMinutes - fTimezoneMinutes) % 60;

		const resHours = ( (hours + hoursDiff) + Math.trunc( (minutes + minutesDiff) / 60 ) ) % 24;
		const resMinutes = (minutes + minutesDiff) % 60;

		await interaction.reply({content: `${hours}:${minutes} at ${fTimezoneHours}:${fTimezoneMinutes} is ${resHours}:${resMinutes} at ${lTimezoneHours}:${lTimezoneMinutes}.`})
		//incorrectly formatted right now, fix that
		},
};