const { Request, Response, NextFunction } = require("express");
const { default: axios } = require("axios");
const { webhookWorker } = require("./webhook");

module.exports = {

 
    async fetchUser(username) {
        try {
            const request = await axios({
                method: `get`,
                url: `https://playerdb.co/api/player/minecraft/${username}`,
            });
            const data = request;
            const playername = data.data.data.player.username
            const uuid = data.data.data.player.id
            const raw_uuid = data.data.data.player.raw_id
            return { success: true, uuid, playername, raw_uuid };
        } catch(err) {
            const errmsg = `Couldn't find any profile with name ${username}`
            return { success: false, status: err.code, error: errmsg };
        }
    },

    async fetchCapes(uuid) {
        try {
            const request = await axios({
                method: `get`,
                url: `https://api.capes.dev/load/${uuid}/`,
            });
            const data = request;
            const optifine = data.data.optifine.frontImageUrl
            const minecraft = data.data.minecraft.frontImageUrl
            const success = true

            return { success, optifine, minecraft };
        } catch(err) {
            console.log(err)
            return { success: false, status: err.errorType, code: err.errorCode, error: err.error };
        }
    },


   
}