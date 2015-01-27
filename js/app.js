App = Ember.Application.create();

// Get facebook user object from facebook here
var currentUser = {
  facebook_id: 1
};

App.Router.map(function() {
  // Left menu 
  this.route("profile");
  this.route("home");
  this.resource("groups");
  this.resource("group", { path: "groups/:groupId"});
  this.route("messages");
  this.route("notifications");

  // Right menu
  this.route("add-group");

});

App.ApplicationRoute = Ember.Route.extend({
    renderTemplate: function() {
        // Render default outlet   
        this.render();
        // render extra outlets
        this.render("left-menu", {
            outlet: "left-menu",
            into: "application" // important when using at root level
        });

        this.render("right-menu", {
            outlet: "right-menu",
            into: "application" 
        });
    }
});

// Solves the Height 100% issue
App.ApplicationView = Ember.View.extend({
    classNames: ["ember-app"]
})


// Home Code starts here

App.HomeRoute = Ember.Route.extend({
  // Return the status updates that this user can see
  model: function() {
    // Get facebook id
    var id = currentUser.facebook_id;

    // Get the groups they are in 
    // ...

    // Get all the id's of members in that group 
    // ...

    // Get all of the most recent statuse updates from those users
    // ..

    // return those status updates
    return statusUpdates;
  }
});

App.HomeController = Ember.ArrayController.extend({
  hasStatusCheckIns: function() {
    return this.get("model.length") > 0;
  }.property("@each")
});

App.StatusCheckInController = Ember.ObjectController.extend({
  userName: function() {
    var statusCheckInUserID = this.get("model.userID");
    var user = users.findBy("userID", statusCheckInUserID);

    return user.firstName + " " + user.lastName;

  }.property("userID"),

  imageURL: function() {
    var statusCheckInUserID = this.get("model.userID");
    var user = users.findBy("userID", statusCheckInUserID);

    return user.imageURL; 
  }.property("userID")
});

App.SingleStatusCheckInComponent = Ember.Component.extend({
  tagName: "li",
  classNames: ["statusUpdateItem"]
});

// Messages code starts here

App.MessagesRoute = Ember.Route.extend({
  model: function() {
    // Get facebook id
    var id = currentUser.facebook_id;

    return messages;
  }
});

// Groups code starts here
App.GroupsRoute = Ember.Route.extend({
  model: function() {
    // Get facebook id
    var id = currentUser.facebook_id;

    return groups;
  }, 

  setupController: function(controller, model) {
    controller.setProperties({
      model: model,
      groups: groups
    });
  }
});

App.GroupRoute = Ember.Route.extend({
  model: function(params) {
    // Get facebook id
    var id = currentUser.facebook_id;
    var group = groups.findBy("group_id", params.group_id);

    return group;
  }, 

  renderTemplate: function() {
      this.render('group', { into: 'application' });
  }, 

  serialize:function(model){
    return { groupId: Em.get(model, 'group_id')};
  }

});

App.GroupController = Ember.ObjectController.extend({
  totalHours: function() {
    // Random function for show
    return this.get("model.group_id") * 6 + 20;
  }.property("group_id"),

  backgroundImageStyle: function() {
    return "background-image: url('" + this.get('model.imageURL') + "');";
  }.property("imageURL")
});


var groups = [
  {
    group_id: 3,
    imageURL: "images/bridge.png",
    name: "Sigma Nu"
  }, {
    group_id: 2,
    imageURL: "images/lion.png",
    name: "Soccer"
  }, {
    group_id: 7,
    imageURL: "images/city.png",
    name: "The Cool Kids"
  }
]; 

var users = [
  {
    userID: 1,
    imageURL: "images/lucas_david_usr.png",
    firstName: "Lucas",
    lastName: "David"
  }, {
    userID: 2,
    imageURL: "images/deryck_whibley_usr.png",
    firstName: "Deryck",
    lastName: "Whibley"
  }, {
    userID: 3,
    imageURL: "images/beach_usr.png",
    firstName: "Amy",
    lastName: "Kirk"
  }
]; 

var messages = [
  {
    userID: 1,
    imageURL: "images/lucas_david_usr.png",
    firstName: "Lucas",
    lastName: "David"
  }, {
    userID: 2,
    imageURL: "images/deryck_whibley_usr.png",
    firstName: "Deryck",
    lastName: "Whibley"
  }, {
    userID: 3,
    imageURL: "images/beach_usr.png",
    firstName: "Amy",
    lastName: "Kirk"
  }
]; 

var statusUpdates = [
  {
    userID: 1,
    statusText: "working on StudyIn!",
    locationText: "Robert E Kennedy Library",
    imageURL: "images/lucas_david_usr.png",
    firstName: "Lucas",
    lastName: "David"
  }, {
    userID: 2,
    imageURL: "images/deryck_whibley_usr.png",
    statusText: "Late night at the studio",
    locationText: "Island Records Studio",
    firstName: "Deryck",
    lastName: "Whibley"
  }, {
    userID: 3,
    imageURL: "images/beach_usr.png",
    statusText: "Has anyone finished the english hw?",
    locationText: "University Union",
    firstName: "Amy",
    lastName: "Kirk"
  }
];

/*
 * COLLECTIONS CODE STARTS HERE
 */
/*
// Collections Route
App.CollectionsRoute = Ember.Route.extend({
  model: function() {
    return [
      {
        title: "Samoca Photography Collections",
        copy: "The Photography Gallery exhibits over 2,000 rotating examples from the permanent collection, which spans from the very beginnings of the medium to the present day. Collection highlights include silver  gelatin prints by Ansel Adams, landscapes by John Pfal, and portraits  by Robert Mapplethorpe.",
        image: "images/collections/collections-photography.jpg"
      }, {
        title: "Samoca Painting Collections",
        copy: "The SAMOCA collection of paintings includes work from 1950 to the present, and is ever expanding. The collection is especially renowned for its emphasis on California art and artists, including Sam Francis, Nathan Oliveira, and Wayne Thiebaud.",
        image: "images/collections/collections-painting.jpg"
      }, {
        title: "Samoca Sculpture Collections",
        copy: "Comprising American sculpture from the mid-19th through the late 20th centuries, SAMOCA's collection is famed for its almost complete series of Frederic Remington's, as well as the extensive outdoor sculpture gardens containing work from modernist Americans such as Richard Serra and Isamu Noguchi.",
        image: "images/collections/collections-sculpture.jpg"
      }
    ];
  }
});

// Customize the Collections component
App.SingleCollectionComponent = Ember.Component.extend({
  tagName: "article",
  classNames: ["collectionArticleClass cf"]
});

CONTROLLERS CODE STARTS HERE
 

// Route for all Exhibits
App.ExhibitsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("js/exhibits.json").then(function(data) {
      return data.exhibits;
    });
  }
});

// Route for a single Exhibit
App.ExhibitRoute = Ember.Route.extend({
  model: function(params) {
    return $.getJSON("js/exhibits.json").then(function(data) {
      var modelId = params.exhibit_id - 1;
      data.exhibits.title = data.exhibits[modelId].title;
      data.exhibits.artist_name = data.exhibits[modelId].artist_name;
      data.exhibits.exhibit_info = data.exhibits[modelId].exhibit_info;
      data.exhibits.image = data.exhibits[modelId].image;
      return data.exhibits;
    });
  }
});

// Array controller...decorates all model data
App.ExhibitsController = Ember.ArrayController.extend({
  totalExhibits: function(){
    return this.get("model.length");
  }.property("@each")
});

// Object controller...decorates a single piece of model data
App.ExhibitController = Ember.ObjectController.extend({
  exhibitTitle: function(){
    return this.get("title") + " by " + this.get("artist_name");
  }.property("artist_name", "title")
});

/*
 * NOTES CODE STARTS HERE


 App.Note = DS.Model.extend({
  copy: DS.attr()
});

App.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("note");
  }
});

App.NotesController = Ember.ArrayController.extend({
  actions: {
    newNote: function() {
      var copy = this.get("noteText");
      if (!copy) {
        return false;
      }

      var note = this.store.createRecord("note", {
        copy: copy
      });

      this.set("noteText", "");
      note.save();
    }
  }
});

App.NoteController = Ember.ObjectController.extend({
  isEditing: false,
  actions: {
    editNote: function() {
      this.set("isEditing", true);
    },
    saveNewNote: function() {
      this.set("isEditing", false);
      if (!(this.get("model.copy"))) {
        this.send("deleteNote");
      } else {
        this.get("model").save();
      }
    }
  }
});

App.EditNote = Ember.TextArea.extend({
  attributeBindings: ["cols", "rows"],
  cols: 50,
  rows: 10
});

Ember.Handlebars.helper("update-note", App.EditNote);

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: "samocaNotes"
});

*/