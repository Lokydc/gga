class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.type = options.type
        this.name_localizations = options.name_localizations
        this.description_localizations = options.description_localizations
        this.description = options.description
        this.options = options.options
        this.userPerms = options.userPerms
        this.staff = options.staff
    }
}

module.exports = Command