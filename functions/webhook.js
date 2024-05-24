const axios = require("axios").default

async function webhookWorker(status, message) {
    if(status === "success") {
        status = "<:online:1239212538428657704>"
    } else if(status === "failed") {
        status = "<:dnd:1239212535845228755>"
    }
    const params = {
        username: "PlayerMC",
        embeds:[{"title":"PlayerMC - Logs", "description":`${status} - ${message}`}]
        }

    axios({
        method: 'POST',
        url: "https://discord.com/api/webhooks/1240360427418943499/Erb8JhRYhEmy3czyik04ukpDeE5W5z_yyyJnmMiXSs3m8ey8vXwf1FufElMMsVyE3C1C",
        headers: {
          'Content-Type': 'application/json',
        },
        data: params,
      }).catch((error => {
        console.log(error)
      }))
}

module.exports = { webhookWorker }