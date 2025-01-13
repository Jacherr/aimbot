const djs = require('discord.js');
const client = new djs.Client({
    intents: "GuildMembers"
});

if(!process.env.WELCOME_CHANNEL_ID || !process.env.DISCORD_TOKEN)
{
    throw new Error("WELCOME_CHANNEL_ID or DISCORD_TOKEN env variable not set");
}

(async () => {
    client.on('guildMemberAdd', async (member) => {
        const message = `Welcome <@${member.user.id}> (${member.user.displayName === member.user.globalName ? `${member.user.displayName}/${member.user.globalName}` : member.user.globalName}) to AIM, please be sure to read the rules and enjoy your stay.`;
        const channel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

        await channel.send(message);
    });

    client.on('guildMemberRemove', async (member) => {
        const message = `Goodbye <@${member.user.id}> (${member.user.displayName === member.user.globalName ? `${member.user.displayName}/${member.user.globalName}` : member.user.globalName}).`;
        const channel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

        await channel.send(message);
    });

    await client.login(process.env.DISCORD_TOKEN);
})();