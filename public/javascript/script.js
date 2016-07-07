var DATA = {
	stores: [
		{
			title: '好棒棒藥妝店1',
			thumbnail:'http://lorempixel.com/300/200?E9ru92',
			desc:'好棒棒',
			url: 'https://tw.yahoo.com',
			likes: '123' ,
			location: {
				lat: 25.038 +Math.random()/40 - 0.0125,
				lng: 121.53 +  Math.random()/40 - 0.0125
			}
		},
		{
			title: '好棒棒藥妝店2',
			thumbnail:'http://lorempixel.com/300/200?sdkrew',
			desc:'好棒棒',
			url: 'https://tw.yahoo.com',
			likes: '123' ,
			location: {
				lat: 25.038 +Math.random()/40 - 0.0125,
				lng: 121.53 +  Math.random()/40 - 0.0125
			}
		},
		{
			title: '好棒棒藥妝店3',
			thumbnail:'http://lorempixel.com/300/200?34grg',
			desc:'好棒棒',
			url: 'https://tw.yahoo.com',
			likes: '123' ,
			location: {
				lat: 25.038 +Math.random()/40 - 0.0125,
				lng: 121.53 +  Math.random()/40 - 0.0125
			}
		},
		{
			title: '好棒棒藥妝店3',
			thumbnail:'http://lorempixel.com/300/200?dgew2',
			desc:'好棒棒',
			url: 'https://tw.yahoo.com',
			likes: '123' ,
			location: {
				lat: 25.038 +Math.random()/40 - 0.0125,
				lng: 121.53 +  Math.random()/40 - 0.0125
			}
		},
		{
			title: '好棒棒藥妝店3',
			thumbnail:'http://lorempixel.com/300/200?dkojo',
			desc:'好棒棒',
			url: 'https://tw.yahoo.com',
			likes: '123' ,
			location: {
				lat: 25.038 +Math.random()/40 - 0.0125,
				lng: 121.53 +  Math.random()/40 - 0.0125
			}	
		},
		{
			title: '好棒棒藥妝店3',
			thumbnail:'http://lorempixel.com/300/200?dijj2n',
			desc:'好棒棒',
			url: 'https://tw.yahoo.com',
			likes: '123' ,
			location: {
				lat: 25.038 +Math.random()/40 - 0.0125,
				lng: 121.53 +  Math.random()/40 - 0.0125
			}
		},
		{
			title: '好棒棒藥妝店3',
			thumbnail:'http://lorempixel.com/300/200?E9ru92',
			desc:'好棒棒',
			url: 'https://tw.yahoo.com',
			likes: '123' ,
			location: {
				lat: 25.038 +Math.random()/40 - 0.0125,
				lng: 121.53 +  Math.random()/40 - 0.0125
			}
		},
	]
}
var storeMarkers = [];
var user;
var userRadius;
var infoWindow;
var hasInfoWindow = false;
var currentActiveMarker = null;
// 
// 地圖模組
var map = (function(){
	var map = document.getElementById('map');
	// var storeMarkers = [];
	// var user;
	var userPhotoUrl = 'images/user.png';
	var storePhotoUrl= 'images/store.png';
	var options ={
		center: {lat: 25.038, lng: 121.53},
		zoom: 14,
		disableDefaultUI: true
	}
	function infoWindowTemplate(meter) {
		return '<div>距離約 '+ meter +' 公尺<br/>步行約' + Math.floor(meter / 60) + '分鐘</div>';
	};
	function setInfowindow(meter){
		infoWindow = new google.maps.InfoWindow({
		    content: infoWindowTemplate(meter)
		});
	} 

	function initMap() {
	    map = new google.maps.Map(map, options);
	}
	function showStore(stores){
		$.each(stores, function(idx, store){
			(function(i){
				setTimeout(_pushMarker.bind(null, store), 1000 + i * 250);
			}(idx))
		})
	}
	function showUser() {
		user = new google.maps.Marker({
			map: map,
			position: options.center,
			animation: google.maps.Animation.BOUNCE,
			draggable: true,
			icon: userPhotoUrl
		})
		_drawRadius(options.center, 2000);

        setTimeout(user.setAnimation.bind(user, null), 5700);

	}
	function _drawRadius(location, radius){
		userRadius ? userRadius.setMap(null) : ''
		userRadius = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.15,
            map: map,
            center: location,
            radius: radius
        });
	}
	function showInfo(index, meter){
		if(hasInfoWindow){
			infoWindow.close();
		}
		setInfowindow(meter)
		infoWindow.open(map, storeMarkers[index]);
		hasInfoWindow = true;
	}
	function mapEventBinding(){
		google.maps.event.addListener(user, 'dragend', function(){
		    var lat = this.position.lat();
		    var lng = this.position.lng();
		    _drawRadius({lat: lat, lng: lng}, 2000);
		});
	}
	function _pushMarker(store){
		storeMarkers.push(new google.maps.Marker({
			map: map,
			position: store.location,
			animation: google.maps.Animation.DROP,
			icon: storePhotoUrl
		}))
	}
	function getDistance(p1, p2) {
	    var R = 6378137; // Earth’s mean radius in meter
	    var dLat = rad(p2.position.lat() - p1.position.lat());
	    var dLong = rad(p2.position.lng() - p1.position.lng());
	    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	        Math.cos(rad(p1.position.lat())) * Math.cos(rad(p2.position.lat())) *
	        Math.sin(dLong / 2) * Math.sin(dLong / 2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    var d = Math.floor(R * c / 100) * 100;
	    function rad(x) {
		    return x * Math.PI / 180;
		};
	    return d; // returns the distance in meter
	};

	return {
		initMap: initMap,
		showStore: showStore,
		showUser: showUser,
		showInfo: showInfo,
		getDistance: getDistance,
		mapEventBinding: mapEventBinding
	}
}());

var app = (function(map){
	var storeList;
	var itemWidth;
	var itemLength;
	var storeItem;
	var step;
	var initialScrollRight;
	var inicatorRange;
	var indicatorMoveRatio;
	function cacheDOM(){
		storeList = $('.store-list');
		storeItem = $('.js-store-list-item');
		indicator = $('.indicator');
	}
	function renderStore(stores){
		$.each(stores, function(index, store){
			var li = _template(store, index);
			storeList.append(li);
		})
	}
	function _template(store, index){
		var template = '<li class="store-list__item js-store-list-item" data-lng="' + store.lng + '" data-lat="' + store.lat + '" data-index="'+ index +'" style="background: url(' + store.thumbnail + ') center center; background-size: cover"><p class="title">' + store.title + '</p><p class="desc">' + store.desc + '</p><a href="' + store.url + '" class="url">看看</a></li>';
		return template;
	}
	function eventBinding(){
		storeItem.click(function(){
			var idx = $(this).attr('data-index');
			markerFocuse(idx);

		})
		// $(storeList).scroll(function(){
		// 	var scrollLeft = $(this).scrollLeft();
		// 	checkScrollposition(scrollLeft);
		// 	var indecatorPos = indicatorMoveRatio * scrollLeft;
		// 	indicator.css('transform', 'translateX(' + indecatorPos + 'px)');
		// })
	}
	function markerFocuse(idx){
		storeItem.removeClass('active');
		$(storeItem[idx]).addClass('active');
		map.showInfo(idx, map.getDistance(user, storeMarkers[idx]));
		currentActiveMarker = idx;
	}
	function checkScrollposition(pos){
		var modulus = Math.floor(pos / step);
		console.log(modulus)
		if(currentActiveMarker !== modulus){
			markerFocuse(modulus);
		}
	}
	function init(){
		deviceWidth = $('.container').width();
		itemWidth   = storeItem.outerWidth() + 15;
		itemLength  = storeItem.length; 
		initialScrollRight = (itemWidth * itemLength - deviceWidth);
		step =  initialScrollRight / itemLength;
		indicatorRange = deviceWidth - 140;
		indicatorMoveRatio = indicatorRange / initialScrollRight
	}
	return {
		cacheDOM: cacheDOM,
		renderStore: renderStore,
		eventBinding: eventBinding,
		init: init
	}
}(map))



$(document).ready(function(){
	app.cacheDOM();
	app.renderStore(DATA.stores);
	app.cacheDOM();
	app.eventBinding();
	app.init();
	map.initMap();
	map.showUser();
	map.showStore(DATA.stores);
	map.mapEventBinding()
})