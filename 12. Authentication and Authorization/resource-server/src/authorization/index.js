const { defineAbility } = require('@casl/ability');
const mongoose = require('mongoose');

const definePermissionsFor = (user) => {
    return defineAbility((can) => {
        if (user.role === 'editor') {
            can('read', 'articles');
            can('create', 'articles');
            can('update', 'articles', { author: new mongoose.Types.ObjectId(user.sub) });
            can('delete', 'articles', { author: new mongoose.Types.ObjectId(user.sub) });
        } 
        
        else if (user.role === 'reader') {
            can('read', 'articles');
        }
    });
};

module.exports = {
    definePermissionsFor
};
