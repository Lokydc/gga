const {
    MessageActionRow,
    Message,
    MessageEmbed,
    MessageButton,
  } = require("discord.js");
  
  const User = require('../../src/database/Schemas/User')
  const Money = require('discord-mongo-currency')
  /**
   * Creates a pagination embed
   * @param {Interaction} interaction
   * @param {MessageEmbed[]} pages
   * @param {MessageButton[]} buttonList
   * @param {number} timeout
   * @returns
   */
  const paginationEmbed = async (
    interaction,
    pages,
    buttonList,
    timeout = 120000,
    coins,
    value,
    user
  ) => {
    
    if (!pages) throw new Error("Pages are not given.");
    if (!buttonList) throw new Error("Buttons are not given.");
    if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
      throw new Error(
        "Link buttons are not supported with discordjs-button-pagination"
      );
    if (buttonList.length !== 3) throw new Error("Need two buttons.");
  
    let page = 0;
  
    const row = new MessageActionRow().addComponents(buttonList);
  
    //has the interaction already been deferred? If not, defer the reply.
    if (interaction.deferred == false) {
      await interaction.deferReply();
    }
    buttonList[0].setDisabled(true)
  
    const curPage = await interaction.editReply({
      embeds: [pages[page].embed.setFooter({ text: `Página ${page + 1} / ${pages.length}` })],
      components: [row],
      files: [pages[page].file],
      fetchReply: true,
    });
  
    const filter = (i) =>
      i.customId === buttonList[0].customId ||
      i.customId === buttonList[1].customId ||
      i.customId === buttonList[2].customId;
  
    const collector = await curPage.createMessageComponentCollector({
      filter,
      time: timeout,
    });
  
    collector.on("collect", async (i) => {
        if(i.user.id !== interaction.user.id) return;
      switch (i.customId) {
        case buttonList[0].customId:
          page = page > 0 ? --page : pages.length - 1;
          break;
        case buttonList[1].customId:
          page = page + 1 < pages.length ? ++page : 0;
          break;
        default:
          break;
      }

      await i.deferUpdate();


      if(user.profile.backgrounds.includes(value[page].link)) {
        buttonList[2].setLabel('JÁ POSSUI'),
        buttonList[2].setStyle('SECONDARY'),
        buttonList[2].setDisabled(true)
      } else {
        buttonList[2].setLabel('COMPRAR'),
        buttonList[2].setStyle('SUCCESS'),
        buttonList[2].setDisabled(false)
      }
      if(coins > value[page].value) {
        buttonList[2].setDisabled(false)
      } else if(coins < value[page].value && !user.profile.backgrounds.includes(value[page].link)) {
        buttonList[2].setDisabled(true),
        buttonList[2].setLabel('CARAMELOS INSUFICIENTE'),
        buttonList[2].setStyle('DANGER')
      }
      if(page === 0) {
        buttonList[0].setDisabled(true)
        buttonList[1].setDisabled(false)
      } else if(page+1 >= pages.length) {
        buttonList[1].setDisabled(true)
        buttonList[0].setDisabled(false)
      }
      if(i.customId === buttonList[2].customId && !user.profile.backgrounds.includes(value[page].link)) {
        user.profile.backgrounds.push(value[page].link)
        user.save()
        await i.editReply({ content: 'Background comprado com sucesso!', embeds: [], components: []})
      } else {
        await i.editReply({
          embeds: [pages[page].embed.setFooter({ text: `Página ${page + 1} / ${pages.length}` })],
          components: [row],
          files: [pages[page].file]
        });
        collector.resetTimer();
      }
    });
  
    collector.on("end", (_, reason) => {
      if (reason !== "messageDelete") {
        const disabledRow = new MessageActionRow().addComponents(
          buttonList[0].setDisabled(true),
          buttonList[1].setDisabled(true)
        );
        curPage.edit({
          embeds: [pages[page].embed.setFooter({ text: `Página ${page + 1} / ${pages.length}` })],
          components: [disabledRow],
          files: [pages[page].file]
        });
      }
    });
  
    return curPage;
  };
  module.exports = paginationEmbed;
  