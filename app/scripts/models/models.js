var Backbone = require('backbone');

var Chat = Backbone.Model.extend({
  idAttribute: '_id',
  initialize: function(){
    if (!this.get('created')){
      this.set({'created': Date.now()});
    }
  }
});

var ChatCollection = Backbone.Collection.extend({
  initialize: function(){
  },
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/messages',
  model: Chat,
  comparator: '_id'
});

module.exports = {
  Chat: Chat,
  ChatCollection: ChatCollection
};
