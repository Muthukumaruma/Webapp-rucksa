import React from "react";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const NETWORK = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
  withCredentials: true
});

NETWORK.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    try {
      let match = Object.keys(apiList()).filter(function(a) {
        return error.config.url.indexOf(a) !== -1;
      });

      if (match.length > 0) {
        console.log(error);
      }
      if (error.response.status === 500) {
        //REDIRECT.RouteTo404()
      }
    } catch (error) {}

    return Promise.reject(error);
  }
);

export default NETWORK;
