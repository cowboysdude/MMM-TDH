/* Magic Mirror
 * Module: MMM-TDH
 *
 * By cowboysdude
 *
 */
Module.register("MMM-TDH", {

    // Module config defaults.
    defaults: {
        updateInterval: 24 * 60 * 1000, // every 10 minutes
        animationSpeed: 10,
        initialLoadDelay: 875, // 0 seconds delay
        retryDelay: 1500,
        fadeSpeed: 7,
        maxWidth: '90%'
    },

    getStyles: function() {
        return ["MMM-TDH.css" ];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification('CONFIG', this.config);

        // Set locale.
        this.today = "";
        this.TDH = {};
        this.scheduleUpdate();
    },
    
     processTDH: function(data) {
        this.TDH = data.data;
    console.log(this.TDH.Births);
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getTDH();
        }, this.config.updateInterval);
        this.getTDH(this.config.initialLoadDelay);
    },

    getTDH: function() {
        this.sendSocketNotification('GET_TDH');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "TDH_RESULT") {
            this.processTDH(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },


    getDom: function() {
    	
        var wrapper = document.createElement("div");
		 
		

        if (!this.loaded) {
            wrapper.innerHTML = "Gathering History...";
            wrapper.className = "bright small";
            return wrapper;
        }
         
            
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright");
            header.innerHTML = 'TDH';
            wrapper.appendChild(header);
         
        for (var i = 0; i < this.TDH.length; i++) {
            var TDH = this.TDH[i];
    console.log(TDH);
 
         }
        
        return wrapper;
    },
});