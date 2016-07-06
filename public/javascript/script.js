var DATA = {
	stores: [
		{
			title: '好棒棒藥妝店1',
			thumbnail:'http://loremflickr.com/100/100?E9ru92',
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
			thumbnail:'http://loremflickr.com/100/100?sdkrew',
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
			thumbnail:'http://loremflickr.com/100/100?34grg',
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
			thumbnail:'http://loremflickr.com/100/100?dgew2',
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
			thumbnail:'http://loremflickr.com/100/100?dkojo',
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
			thumbnail:'http://loremflickr.com/100/100?dijj2n',
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
			thumbnail:'http://loremflickr.com/100/100?E9ru92',
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
// 
// 地圖模組
var map = (function(){
	var map = document.getElementById('map');
	// var storeMarkers = [];
	// var user;
	var userPhotoUrl = 'images/han.jpg'
	var options ={
		center: {lat: 25.038, lng: 121.53},
		zoom: 14
	}
	var infoWindowTemplate = '<div>哈囉你好嗎</div>';
	var infowindow = new google.maps.InfoWindow({
	    content: infoWindowTemplate
	});

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
		userRadius = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.15,
            map: map,
            center: options.center,
            radius: 2000
          });
	}
	function showInfo(index){
		infowindow.open(map, storeMarkers[index]);
	}
	function _pushMarker(store){
		storeMarkers.push(new google.maps.Marker({
			map: map,
			position: store.location,
			animation: google.maps.Animation.DROP
		}))
	}

	return {
		initMap: initMap,
		showStore: showStore,
		showUser: showUser,
		showInfo: showInfo
	}
}());

var app = (function(map){
	var storeList;
	function cacheDOM(){
		storeList = $('.store-list');
		storeItem = $('.js-store-list-item')
	}
	function renderStore(stores){
		$.each(stores, function(index, store){
			var li = _template(store.title, store.desc, store.url, store.thumbnail, index);
			storeList.append(li);
		})
	}
	function _template(title, desc, url, thumbnail, index){
		var template = '<li class="store-list__item js-store-list-item" data-index="'+ index +'" style="background: url(' + thumbnail + ') center center; background-size: cover"><p class="title">' + title + '</p><p class="desc">' + desc + '</p><a href="' + url + '" class="url">看看</a></li>';
		return template;
	}
	function eventBinding(){
		console.log()
		storeItem.hover(function(){
			var idx = $(this).attr('data-index');
			console.log(idx)
		})
		storeItem.click(function(){
			var idx = $(this).attr('data-index')
			storeItem.removeClass('active');
			$(this).addClass('active');
			map.showInfo(idx);
		})
		// $(storeList).scroll(function(){
		// 	console.log($(this).scrollLeft())
		// })
	}
	return {
		cacheDOM: cacheDOM,
		renderStore: renderStore,
		eventBinding: eventBinding
	}
}(map))



$(document).ready(function(){
	app.cacheDOM();
	app.renderStore(DATA.stores);
	app.cacheDOM();
	app.eventBinding();
	map.initMap();
	map.showUser();
	map.showStore(DATA.stores);
})