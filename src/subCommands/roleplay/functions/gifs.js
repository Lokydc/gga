const axios = require('axios')

async function kiss() {
    let res2 = await axios.get('https://api.satou-chan.xyz/api/endpoint/kiss')
    return res2.data.url
}
async function slap() {
    let res2 = await axios.get('https://api.satou-chan.xyz/api/endpoint/punch')
    return res2.data.url
}
async function dance() {'gl'
    let res2 = await axios.get('https://api.satou-chan.xyz/api/endpoint/dance')
    return res2.data.url
}
async function hug() {
    let res2 = await axios.get('https://some-random-api.ml/animu/hug')
    return res2.data.link
}

module.exports = {
    hug,
    slap,
    dance,
    kiss
}
