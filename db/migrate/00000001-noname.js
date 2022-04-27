'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "AlarmNotifications", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2022-04-26T08:45:51.060Z",
    "comment": ""
};

var migrationCommands = [

    {
        fn: "createTable",
        params: [
            "AlarmNotifications",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "currencyPair": {
                    "validate": {
                        "notEmpty": true
                    },
                    "type": Sequelize.STRING
                },
                "originalBidPrice": {
                    "validate": {
                        "notEmpty": true
                    },
                    "type": Sequelize.DECIMAL(32, 16)
                },
                "fetchedBidPrice": {
                    "validate": {
                        "notEmpty": true
                    },
                    "type": Sequelize.DECIMAL(32, 16)
                },
                "oscilationPercentage": {
                    "validate": {
                        "notEmpty": true
                    },
                    "type": Sequelize.DECIMAL(10, 7)
                },
                "percentPriceDifference": {
                    "validate": {
                        "notEmpty": true
                    },
                    "type": Sequelize.DECIMAL(10, 7)
                },
                "fetchIntervalInSeconds": {
                    "validate": {
                        "notEmpty": true
                    },
                    "type": Sequelize.DECIMAL(10, 3)
                },
                "timeOfBidPrice": {
                    "validate": {
                        "notEmpty": true
                    },
                    "type": Sequelize.DATE
                },
                "timeOfNotification": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

var rollbackCommands = [{
    fn: "dropTable",
    params: ["AlarmNotifications"]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < rollbackCommands.length)
                {
                    let command = rollbackCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
