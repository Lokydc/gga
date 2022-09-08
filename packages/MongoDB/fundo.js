const Collection = require('../../src/database/Schemas/Fundo')

class Backgrounds {

    static async generate(amount) {
        if (!amount) throw new TypeError("Please provide the amount of users to show.");
        if (isNaN(amount)) throw new TypeError("Amount must be a number");

        let users = await Collection.find({ user: '1010' }).exec();

        return users.slice(0, amount);
    }
}

module.exports = Backgrounds;