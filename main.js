var CheckIn = Backbone.Model.extend({
  defaults: {
    name: "No name specified",
    days: 0,
    date: "No date specified",
    roomNumber: 0
  },
});

var CheckInsCollection = Backbone.Collection.extend({
  model: CheckIn,
});

var CheckInView = Backbone.View.extend({
  tagName:"tr",
  className:'appended',

  initialize: function () {
    this.render();
  },

  events: {
    'click .btn-danger' : 'checkout'
  },

  checkout: function () {
    checkInsCollection.remove(this.model);
    checkInsView.render();
    console.log(":D");
  },

  template: _.template($("#check-in-template").text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('table').append(this.el);
    console.log('rendering!!');
  }
});

var CheckInsView = Backbone.View.extend({
  initalize: function () {
    this.render();
    this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function () {
    console.log(this.collection);
    $('.appended').remove();
    _.each(this.collection.models, function (i) {
      new CheckInView({model:i});
    });
  }
});

$(document).ready(function () {
  $('.btn-success').click(function () {
    $('form').removeClass('hidden');
  });

  window.checkInsCollection = new CheckInsCollection();
  window.checkInsView = new CheckInsView({collection:checkInsCollection});

  $('.btn-default').click(function () {
    var name = $('input[name="name"]').val();
    var days = $('input[name="days"]').val();
    var date = $('input[type="date"]').val();
    var roomNumber = $('input[name="roomNumber"]').val();

    var newModel = new CheckIn({
      name: name,
      days: days,
      date: date,
      roomNumber: roomNumber
    });

    checkInsCollection.add(newModel);
    checkInsView.render();

    $('input[name="name"]').val(null);
    $('input[name="days"]').val(null);
    $('input[type="date"]').val(null);
    $('input[name="roomNumber"]').val(null);


    $('form').addClass("hidden");
  });
});
