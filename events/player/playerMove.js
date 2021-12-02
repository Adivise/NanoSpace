const { MessageEmbed } = require("discord.js");
const Client = require("../../index.js");
const { Player } = require("erela.js");

    /**
     * 
     * @param {Client} client 
     * @param {Player} player 
     * @param {String} oldChannel
     * @param {String} newChannel
     */

module.exports = async (client, player, oldChannel, newChannel) => {
      const guild = client.guilds.cache.get(player.guild)
      if(!guild) return;
      const channel = guild.channels.cache.get(player.textChannel);
        if(oldChannel === newChannel) return;
        if(newChannel === null || !newChannel) {
        if(!player) return;

        const embed = new MessageEmbed()
        .setTitle("Disconnected")
        .setDescription(`I've been disconnected from <#${oldChannel}>.`)
        .setTimestamp()
        .setColor("#000001")

        if(channel) await channel.send({ embeds: [embed] })
         return player.destroy();
      } else {
        player.voiceChannel = newChannel;

        const embed = new MessageEmbed()
        .setTitle("Moved")
        .setDescription(`I've been moved to <#${player.voiceChannel}>.`)
        .setTimestamp()
        .setColor("#000001")
        
        if(channel) await channel.send({embeds: [embed] });
        if(player.paused) player.pause(false);
      }

}