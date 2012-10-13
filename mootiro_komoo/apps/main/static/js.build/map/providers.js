(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["map/component"],function(e){var n,r,i;return window.komoo==null&&(window.komoo={}),(i=window.komoo).event==null&&(i.event=google.maps.event),r=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.name="Generic Provider",n.prototype.alt="Generic Data Provider",n.prototype.tileSize=new google.maps.Size(256,256),n.prototype.maxZoom=32,n.prototype.enabled=!0,n.prototype.init=function(e){return this.options=e,this.addrLatLngCache={},this.fetchedTiles={}},n.prototype.setMap=function(e){return this.map=e,this.map.googleMap.overlayMapTypes.insertAt(0,this),typeof this.handleMapEvents=="function"?this.handleMapEvents():void 0},n.prototype.enable=function(){return this.enabled=!0},n.prototype.disable=function(){return this.enabled=!1},n.prototype.getAddrLatLng=function(e,t){var n,r,i,s,o,u,a;return n="x="+e.x+",y="+e.y+",z="+t,this.addrLatLngCache[n]?this.addrLatLngCache[n]:(i=1<<t,u=this.map.googleMap.getProjection(),s=new google.maps.Point((e.x+1)*this.tileSize.width/i,e.y*this.tileSize.height/i),o=new google.maps.Point(e.x*this.tileSize.width/i,(e.y+1)*this.tileSize.height/i),r=u.fromPointToLatLng(s),a=u.fromPointToLatLng(o),this.addrLatLngCache[n]="bounds="+r.toUrlValue()+","+a.toUrlValue()+"&zoom="+t)},n}(e),n=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.name="Feature Provider",n.prototype.alt="Feature Provider",n.prototype.fetchUrl="/get_geojson?",n.prototype.init=function(e){return n.__super__.init.call(this,e),this.keptFeatures=komoo.collections.makeFeatureCollection()},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("idle",function(){var t;if(e.enabled===!1)return;return t=e.map.googleMap.getBounds(),e.keptFeatures.forEach(function(e){if(!t.intersects(e.getBounds()))return e.setMap(null)}),e.keptFeatures.clear()})},n.prototype.releaseTile=function(e){var t,n=this;if(this.enabled===!1)return;if(this.fetchedTiles[e.addr])return t=this.map.getBounds(),this.fetchedTiles[e.addr].features.forEach(function(e){if(e.getBounds){if(!t.intersects(e.getBounds()))return e.setMap(null);if(!t.contains(e.getBounds().getNorthEast()||!t.contains(e.getBounds().getSouthWest())))return n.keptFeatures.push(e),e.setMap(n.map)}else if(e.getPosition&&!t.contains(e.getPosition()))return e.setMap(null)})},n.prototype.getTile=function(e,t,n){var r,i,s=this;return i=n.createElement("DIV"),r=this.getAddrLatLng(e,t),i.addr=r,this.enabled===!1?i:this.fetchedTiles[r]?(this.fetchedTiles[r].features.setMap(this.map),i):($.ajax({url:this.fetchUrl+r,dataType:"json",type:"GET",success:function(e){var t;return t=s.map.loadGeoJSON(JSON.parse(e),!1),s.fetchedTiles[r]={geojson:e,features:t},t.setMap(s.map)},error:function(e,t){var n,r;return typeof console!="undefined"&&console!==null&&console.error(t),r=$("#server-error"),r.parent().length===0&&(r=$("<div>").attr("id","server-error"),$("body").append(r)),n=$("<div>").html(e.responseText),r.append(n)}}),i)},n}(r),window.komoo.providers={GenericProvider:r,FeatureProvider:n,makeFeatureProvider:function(e){return new n(e)}},window.komoo.providers})}).call(this)