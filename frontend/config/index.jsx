const { default : axios } = require("axios");

export const clientServer = axios.create({
    baseURL: "hhtp;//localhost:9090",
})