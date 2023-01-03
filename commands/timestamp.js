const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { checkTimeFormat, checkTimeZoneFormat } = require('../helper_modules/timehelper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timestamp')
		.setDescription('Helper command for making timestamps')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('The time of the timestamp.')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('date')
				.setDescription('The date of the timestamp. Defaults to today.')
				.setRequired(false))
		.addIntegerOption(option =>
			option.setName('month')
				.setDescription('The month (in numbers) of the timestamp. Defaults to this month.')
				.setRequired(false))
		.addIntegerOption(option =>
			option.setName('year')
				.setDescription('The year of the timestamp. Defaults to this year.')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('timezone')
				.setDescription('The time zone of the timestamp, in hours ahead or behind UTC. Defaults to 0.')
				.setRequired(false)),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
					new MessageSelectMenu()
						.setCustomId('style')
						.setPlaceholder('Timestamp Style')
						.addOptions([
							{
								label: 't',
								description: 'Short Time',
								value: 't',
							},
							{
								label: 'T',
								description: 'Long Time',
								value: 'T',
							},
							{
								label: 'd',
								description: 'Short Date',
								value: 'd',
							},
							{
								label: 'D',
								description: 'Long Date',
								value: 'D',
							},
							{
								label: 'f',
								description: 'Short Date/Time (Default)',
								value: 'f',
							},
							{
								label: 'F',
								description: 'Long Date/Time',
								value: 'F',
							},
							{
								label: 'R',
								description: 'Relative Time',
								value: 'R',
							},
						]),
				);

		var timestamp = new Date(Date.now())

		const timeString = interaction.options.getString('time');
		const timezoneString = interaction.options.getString('timezone') ?? '+0:00';

		const [hours, minutes] = checkTimeFormat(timeString);
		const [timezoneHours, timezoneMinutes] = checkTimeZoneFormat(timezoneString);

		if (!hours && hours !== 0) {
			interaction.reply(`Your time is formatted incorrectly! Format it as \`XX:XX AM/PM\`.`);
			return;
		}
		if (!timezoneHours && timezoneHours !== 0) {
			interaction.reply(`Your timezone is formatted incorreectly! Format it as \`+/-XX:XX\`.`);
			return;
		}

		const date = interaction.options.getInteger('date') ?? timestamp.getDate();
		const month = interaction.options.getInteger('month') ?? timestamp.getMonth() + 1;
		const year = interaction.options.getInteger('year') ?? timestamp.getFullYear();

		timestamp = Date.UTC(year, month - 1, date, hours - timezoneHours, minutes - timezoneMinutes) / 1000;

		await interaction.reply({ content: `<t:${timestamp}:f> \n \`<t:${timestamp}:f>\` `, components: [row] });
		const message = await interaction.fetchReply();

		const regexp = /:[tTdDfFR]/g;

		const collector = message.createMessageComponentCollector({ componentType: 'SELECT_MENU', time:15000 });
		collector.on('collect', i => {
			if (!i.isSelectMenu()) return;
			console.log(i.values[0]);
			i.update({ content: message.content.replaceAll(regexp, `:${i.values[0]}`) });
		});

		collector.on('end', collected => {
			console.log('Ended collection');
			row.components[0].disabled = true;
			interaction.editReply({ components: [row] });
		});
	},
};
