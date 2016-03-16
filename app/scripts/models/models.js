var Backbone = require('backbone');
var md5 = require('blueimp-md5');
var _ = require('underscore');
var $ = require('jquery');

var Chat = Backbone.Model.extend({
  idAttribute: '_id',
  initialize: function(options){
    if (!this.get('created_at')){
      this.set({'created_at': Date.now()});
    }
    //don't think we need this
    // this.set({username: options.user.username});
  }
});

var ChatCollection = Backbone.Collection.extend({
  initialize: function(){
  },
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/chattermessages',
  model: Chat,
  comparator: 'created_at'
});

var User = Backbone.Model.extend({
  defaults: {
    username: 'anonymous',
    email: 'test@test.com',
    gravUrl: '',
    lastActive: Date.now()
  },
  idAttribute: 'username',
  initialize: function(){
    var gravHash = md5(this.get('email').trim().toLowerCase());
    console.log(gravHash);
    this.set({'gravUrl': 'http://www.gravatar.com/avatar/' + gravHash });
    console.log(this.get('gravUrl'));
    localStorage.chatterUsername = this.get('username');
    localStorage.chatterEmail = this.get('email');
    localStorage.chatterGravUrl = this.get('gravUrl');
    console.log(localStorage);
  },
  keepActive: function(){
    //keep active should be called by an interval our controller
    //component once the app is active, probably at the same time
    //it is polling the messages endpoint for new messages
    this.set({lastActive: Date.now() });
  },
  logOut: function(){
    // localStorage.remove('chatterUsername');
    // localStorage.remove('chatterEmail');
    // localStorage.remove('chatterGravUrl');
    // this.destroy();
  }
});

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/chatterusers',
  initialize: function(){
    // var interval = setInterval( this.update, 1000 );
  },
  update: function(){
    this.fetch().done(function(){
      console.log(this);
      //eventually we will want to check if any users have closed their
      //browsers which will mean their user will stop updating and be
      //cleared out
      // this.each(function(user){
      //   if ( (Date.now() - user.get('lastActive')) > 30000 ){
      //     user.destroy();
      //   }
      // });
    });
  }
});

module.exports = {
  Chat: Chat,
  ChatCollection: ChatCollection,
  User: User,
  UserCollection: UserCollection
};
