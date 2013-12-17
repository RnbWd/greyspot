localStorage.clear(),window.greyspot={Models:{},Collections:{},Views:{},Routers:{},init:function(){new this.Views.SongsView({collection:new this.Collections.SongsCollection})}};var widgetLoad={};_.extend(widgetLoad,Backbone.Events);var widgetFinish={};_.extend(widgetFinish,Backbone.Events);var widgetPlay={};_.extend(widgetPlay,Backbone.Events);var widgetPause={};_.extend(widgetPause,Backbone.Events);var widgetProgress={};_.extend(widgetProgress,Backbone.Events),$(document).ready(function(){greyspot.init();var a=document.getElementById("grey");widget=SC.Widget(a),widget.bind(SC.Widget.Events.READY,function(){widgetLoad.trigger("ready"),widget.toggle().toggle()}),widget.bind(SC.Widget.Events.PLAY,function(){widgetPlay.trigger("play")}),widget.bind(SC.Widget.Events.FINISH,function(){widgetFinish.trigger("finish")}),widget.bind(SC.Widget.Events.PAUSE,function(){widgetPause.trigger("pause")}),widget.bind(SC.Widget.Events.PLAY_PROGRESS,function(a){widgetProgress.trigger("fire",{position:(100*a.relativePosition).toFixed(1)+"%"})})}),this.JST=this.JST||{},this.JST["app/scripts/templates/song.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='\n<span id="'+(null==(__t=title)?"":__t)+'">\n  <img src="'+(null==(__t=artwork)?"":__t)+'" alt="artwork" class="img-thumbnail" width="60" height="60">\n  '+(null==(__t=title)?"":__t)+' <span class="glyphicon glyphicon-play play hidden"></span>\n</span>\n';return __p},this.JST["app/scripts/templates/songs.ejs"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+='<section>\n\n  <ul class="list-group">\n      <!-- Where our Songs will go -->\n  </ul>\n\n</section>';return __p},greyspot.Collections.SongsCollection=Backbone.Collection.extend({localStorage:new Backbone.LocalStorage("backbone-generator-songs"),initialize:function(){this.model=greyspot.Models.SongModel}}),greyspot.Models.SongModel=Backbone.Model.extend({defaults:{id:"",index:"",title:"",artwork:"",waveform:"",playing:!1},toggle:function(){this.save({playing:!this.get("playing")})}}),greyspot.Views=greyspot.Views||{},greyspot.Views.SongsView=Backbone.View.extend({el:"#songs",template:JST["app/scripts/templates/songs.ejs"],events:{},initialize:function(){this.render(),this.listenTo(this.collection,"add",this.addSongItem),this.listenTo(this.collection,"reset",this.addAllSongItems),this.listenTo(widgetLoad,"ready",this.createSong),this.listenTo(widgetPause,"pause",this.toggleButton),this.listenTo(widgetPlay,"play",this.toggleButton),this.listenTo(widgetPlay,"play",this.checkPlay),this.listenTo(widgetPause,"pause",this.removeColors),this.listenTo(widgetProgress,"fire",this.checkProgress),this.collection.fetch()},render:function(){return this.$el.html(this.template()),this},createSong:function(){var a=this;widget.getSounds(function(b){for(var c=0;c<b.length;c++){var d=b[c].id,e=b[c].title,f=b[c].waveform_url,g=b[c].artwork_url,h=e.indexOf("-");-1!=h&&(e=e.substring(0,h)),a.collection.create(new greyspot.Models.SongModel({id:d,index:c,title:e,waveform:f,artwork:g}))}})},addSongItem:function(a){var b=new greyspot.Views.SongView({model:a});this.$("ul").append(b.render().el)},addAllSongItems:function(){this.collection.each(this.addSongItem,this)},checkPlay:function(){var a=$("#song-title"),b=this;widget.getCurrentSound(function(c){b.collection.each(function(b){c.id==b.id&&a.html(b.attributes.title)})}),$("#frame").toggleClass("colors",!0),$("#songs").toggleClass("colors",!0),$("img").toggleClass("colors",!0),$("li").toggleClass("colors",!0)},checkProgress:function(){},toggleButton:function(){$(".player-play").toggleClass("glyphicon-pause").toggleClass("glyphicon-play")},removeColors:function(){$("#frame").toggleClass("colors",!1),$("#songs").toggleClass("colors",!1),$("img").toggleClass("colors",!1),$("li").toggleClass("colors",!1)}}),greyspot.Views=greyspot.Views||{},greyspot.Views.SongView=Backbone.View.extend({tagName:"li",template:JST["app/scripts/templates/song.ejs"],events:{mouseenter:"enter",mouseleave:"leave",click:"toggleSkip"},initialize:function(){this.render(),this.listenTo(widgetPause,"pause",this.checkPause),this.listenTo(widgetPlay,"play",this.checkPlay),this.listenTo(this.model,"change:playing",this.togglePlay)},render:function(){return this.$el.addClass("list-group-item").html(this.template(this.model.toJSON())),this.waveform(),this},checkPause:function(){var a=this,b=a.model;widget.getCurrentSound(function(c){b.attributes.id==c.id&&a.togglePlay(!1)})},checkPlay:function(){var a=this,b=this.model;widget.getCurrentSound(function(c){b.attributes.id!=c.id||b.attributes.playing?b.attributes.id==c.id&&b.attributes.playing?a.togglePlay(!0):b.attributes.playing&&(b.toggle(),a.togglePlay(!1)):(b.toggle(),a.togglePlay(!0))})},waveform:function(){this.$el.css({"background-image":"url("+this.model.get("waveform")+")","background-size":"cover"})},enter:function(){this.$el.css({"background-color":"orange",color:"#fafafa"}),this.$(".play").removeClass("hidden")},leave:function(){this.$el.css({"background-color":"transparent",color:"#030303"}),this.$(".play").addClass("hidden")},toggleSkip:function(){{var a=this.model.attributes.id,b=this.model.attributes.index;this.model}widget.getCurrentSound(function(c){a==c.id?widget.toggle():widget.skip(b)})},togglePlay:function(a){var b=this;b.model.attributes.playing&&a?b.$(".play").removeClass("glyphicon-play").addClass("glyphicon-pause"):a||b.$(".play").addClass("glyphicon-play").removeClass("glyphicon-pause")}});