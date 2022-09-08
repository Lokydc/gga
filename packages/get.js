const fetch = require('node-fetch')
const getUser = async (userId, token) => {
    const user = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
          Authorization: `Bot ${token}`
        },
      }).then(res => res.json());
    
      return user
}

const getGuild = async (guildId, token) => {
    const guild = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
        headers: {
          Authorization: `Bot ${token}`,
        },
      }).then(res => res.json());

      if(guild.message) return undefined;
    
      return guild
}

module.exports = {
    getUser,
    getGuild
}


getUser('389089969911889920')