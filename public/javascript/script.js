var DATA = {
	stores: [
		{
			title: '好棒棒藥妝店1',
			thumbnail:'http://www.fakenamegenerator.com/dummyimage/60x60/CCCCCC/000000/1 ',
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
			thumbnail:'http://www.fakenamegenerator.com/dummyimage/60x60/CCCCCC/000000/1 ',
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
			thumbnail:'http://www.fakenamegenerator.com/dummyimage/60x60/CCCCCC/000000/1 ',
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
			thumbnail:'http://www.fakenamegenerator.com/dummyimage/60x60/CCCCCC/000000/1 ',
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
			thumbnail:'http://www.fakenamegenerator.com/dummyimage/60x60/CCCCCC/000000/1 ',
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
			thumbnail:'http://www.fakenamegenerator.com/dummyimage/60x60/CCCCCC/000000/1 ',
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
			thumbnail:'http://www.fakenamegenerator.com/dummyimage/60x60/CCCCCC/000000/1 ',
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
// 
var app = (function(){
	var storeList;
	function cacheDOM(){
		storeList = $('.store-list');
	}
	function renderStore(stores){
		$.each(stores, function(key, store){
			var li = _template(store.title, store.desc, store.url);
			storeList.append(li);
		})
	}
	function _template(title, desc, url){
		var template = '<li><p>' + title + '</p><p>' + desc + '</p><p>' + url + '</p></li>';
		return template;
	}
	return {
		cacheDOM: cacheDOM,
		renderStore: renderStore
	}
}())
// 地圖模組
var map = (function(){
	var map = document.getElementById('map');
	var storeMarkers = [];
	var user;
	var options ={
		center: {lat: 25.038, lng: 121.53},
		zoom: 14
	}
	function initMap() {
	    map = new google.maps.Map(map, options);
	}
	function showStore(stores){
		$.each(stores, function(idx, store){
			console.log(idx);
			(function(i){
				setTimeout(_pushMarker.bind(null, store), i * 300);
			}(idx))
		})
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
		showStore: showStore
	}
}());


$(document).ready(function(){
	app.cacheDOM();
	app.renderStore(DATA.stores);
	map.initMap();
	map.showStore(DATA.stores);

})