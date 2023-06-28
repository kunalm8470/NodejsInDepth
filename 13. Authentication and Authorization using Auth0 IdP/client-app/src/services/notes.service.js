const axios = require('axios');
const config = require('../config');

class NotesService {
    constructor() {
        this.fetchNotes = this.fetchNotes.bind(this);
    }

    async fetchNotes(accessToken) {
        const url = `${config.resourceServer.baseUrl}/api/Notes`;

        const options = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.get(url, options);

        return data;
    }
}

module.exports = new NotesService();
