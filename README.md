# timebot
A small Discord bot that provides a utility for creating formatted Unix timestamps for Discord.

[Add this bot to your server!](https://discord.com/api/oauth2/authorize?client_id=992426201488576512&permissions=0&scope=bot%20applications.commands)

## Usage
timebot only provides one command: `/timestamp {time} [date] [month] [year] [timezone]`

`time` is a required input, and is formatted as XX:XX [AM/PM]. Lack of AM or PM results in the time being interpreted as 24 hour time.

`date` `month` `year` are all numeric inputs, and default to the current date/month/year if not provided.

`timezone` is formatted as [+/-]XX:XX, and is the timezone where the timestamp is. 
If a `time` of `12:00` is given along with a `timezone` of `+8:00`, then users in the UTC+8:00 timezone will see the timestamp as being on `12:00`.

Additionally, after the timestamp is created, a dropdown is available to change the formatting of the timestamp. For more information on the available timestamps, see [this](https://discord.com/developers/docs/reference#message-formatting).

## Attributions
timebot uses [discord.js](https://discord.js.org/).

Clock icon created by Those Icons - [Flaticon](https://www.flaticon.com/free-icons/clock).
