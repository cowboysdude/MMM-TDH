/* Magic Mirror
 * Module: MMM-Holiday2
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper'); 
var request = require('request');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting This Day in History module");
    },

    getTDH: function(url) {
        request({
            url: 'https://history.muffinlabs.com/date',
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                this.sendSocketNotification('TDH_RESULT', result);
            }
        });
    },
    
     socketNotificationReceived: function(notification, payload) {
         if (notification === 'GET_TDH') {
             this.getTDH(payload);
             
         }
     }
 });
