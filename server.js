// start
global.server = {};
const express = require('express');
const axios = require("axios").default
const app = express();
const path = require('path');
const { webhookWorker } = require('./functions/webhook');
server.util = require('./functions/util')
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Define a route to render the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/discord', (req,res)=>{
    res.redirect('https://discord.gg/TnS5GAVcxJ')
})

app.get('/search', (req,res) => {
    res.render('index')
})

app.get('/donate', (req,res) => {
    res.render('donate')
})

app.get('/capes', (req,res) => {
   res.redirect("/")
})

app.get('/user/', (req, res) => {
    res.redirect('/')
})

app.get('/user/:username', async (req, res) => {
    const username = req.params.username
    const player = await server.util.fetchUser(username)
    const uuid = player.uuid

    const opcape = await server.util.fetchCapes(uuid)


    if(player.success) {
        const uuid = player.uuid
        const raw_id = player.raw_uuid
        const playername = player.playername
        const opurl = opcape.optifine
        const mcurl = opcape.minecraft
        res.render('userpage', {uuid, playername, opurl, mcurl, raw_id})
        // webhookWorker("success",`someone searched for \`${username}\` \nStatus: \`Found!\``)
    } else {
        console.log(player.success, player.status)
        const reason = player.error
        res.render('error', {reason})
        // webhookWorker("failed",`someone searched for \`${username}\` \nStatus: \`Not Found!\``)
    }
});

app.get('*/:path', (req, res) => {
    const code = '404'
    res.render('404', {code})
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});