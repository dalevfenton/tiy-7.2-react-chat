var Backbone = require('backbone');
var md5 = require('blueimp-md5');
var _ = require('underscore');
var $ = require('jquery');

var Chat = Backbone.Model.extend({
  idAttribute: '_id',
  initialize: function(options){
    if (!this.get('time')){
      this.set({'time': Date.now()});
    }
    //don't think we need this
    // this.set({username: options.user.username});
  }
});

var ChatCollection = Backbone.Collection.extend({
  initialize: function(){
  },
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/messages',
  model: Chat,
  comparator: 'time'
});

var User = Backbone.Model.extend({
  defaults: {
    username: 'anonymous',
    email: 'test@test.com',
    gravUrl: '',
    lastActive: Date.now(),
  },
  idAttribute: '_id',
  initialize: function(){
    var gravHash = md5(this.get('email').trim().toLowerCase());
    this.set({'gravUrl': 'http://www.gravatar.com/avatar/' + gravHash + '?d=identicon'});
    // UNCOMMENT TO RESET LOCAL STORAGE ON ALL USERS AND PUSH BACK TO SERVER
    // this.set({local: false});
    // this.save();
    if (this.get('local')){
      localStorage.chatterUsername = this.get('username');
      localStorage.chatterEmail = this.get('email');
      this.set({'local': false });
    }
  },
  keepActive: function(){
    //keep active should be called by a setInterval on our controller
    //component once the app is active, probably at the same time
    //it is polling the messages endpoint for new messages
    console.log('keepActive called');
    this.set({lastActive: Date.now() });
    this.save();
  },
  logOut: function(){
    localStorage.clear();
    // this.destroy({wait: true});
  }
});

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/chatterusers',
  initialize: function(){
  },
  cleanUp: function(){
    this.fetch().then(function(){
      this.each(function(user){
        if(user){
          console.log( (Date.now() - user.get('lastActive')) );
          if ( (Date.now() - user.get('lastActive')) > 30000 ){
            user.destroy();
          }
        }
      });
    }.bind(this));
  },
  update: function(){
    this.fetch().done(function(){
      // console.log(this);
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
