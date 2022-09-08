const Collection = require('../../src/database/Schemas/transactions')

class Transactions {

    static async generate(userId, amount) {
        if (!userId) throw new TypeError("Please provide a guild ID.");
        if (!amount) throw new TypeError("Please provide the amount of users to show.");
        if (isNaN(amount)) throw new TypeError("Amount must be a number");

        let users = await Collection.find({ user: userId }).exec();

        return users.slice(0, amount);
    }
}

module.exports = Transactions;