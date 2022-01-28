const { MessageActionRow, MessageButton } = require('discord.js')

const NormalPage = async (client, message, pages, timeout, queueLength, queueDuration) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.channel.send({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (interaction) => interaction.user.id === message.author.id ? true : false && interaction.deferUpdate();
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [disabled] })
    });
    return curPage;
};

const SlashPage = async (client, message, pages, timeout, queueLength, queueDuration) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.editReply({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (m) => m.user.id === message.user.id;
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [disabled] })
    });
    return curPage;
};

const NormalPlaylist = async (client, message, pages, timeout, queueLength) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.channel.send({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Playlists`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (interaction) => interaction.user.id === message.author.id ? true : false && interaction.deferUpdate();
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Playlists`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Playlists`})], components: [disabled] })
    });
    return curPage;
};

const SlashPlaylist = async (client, message, pages, timeout, queueLength) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.editReply({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Playlists`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (m) => m.user.id === message.user.id;
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Playlists`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Playlists`})], components: [disabled] })
    });
    return curPage;
};

const NormalMemberCount = async (client, message, pages, timeout, queueLength) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.channel.send({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total members`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (interaction) => interaction.user.id === message.author.id ? true : false && interaction.deferUpdate();
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total members`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total members`})], components: [disabled] })
    });
    return curPage;
};

const SlashMemberCount = async (client, message, pages, timeout, queueLength) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.editReply({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total members`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (m) => m.user.id === message.user.id;
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total members`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total members`})], components: [disabled] })
    });
    return curPage;
};

const NormalGuildCount = async (client, message, pages, timeout, queueLength) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.channel.send({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total servers`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (interaction) => interaction.user.id === message.author.id ? true : false && interaction.deferUpdate();
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total servers`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total servers`})], components: [disabled] })
    });
    return curPage;
};

const SlashGuildCount = async (client, message, pages, timeout, queueLength) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle('SECONDARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle('SECONDARY')
    const row = new MessageActionRow()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.editReply({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total servers`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (m) => m.user.id === message.user.id;
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total servers`})], components: [row] })
        });
    collector.on('end', () => {
        const disabled = new MessageActionRow()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Total servers`})], components: [disabled] })
    });
    return curPage;
};

module.exports = { NormalPage, SlashPage, NormalPlaylist, SlashPlaylist, NormalMemberCount, SlashMemberCount, NormalGuildCount, SlashGuildCount };