
	mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzaW4tbGFiIiwiYSI6ImNrcWw3ajhsYzAxNHkydm9hZ3dyY2xkeHkifQ.L0S8kwfD0By5nbKKl5hKTw';
    var coordinates = document.getElementById('coordinates');
    var map_Basin_DEM = new mapboxgl.Map({
        container: 'map_Basin_DEM',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2
    });

    var canvas = map_Basin_DEM.getCanvasContainer();

    var geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0, 0]
                }
            }
        ]
    };

    function onMove(e) {
        var coords = e.lngLat;

        // Set a UI indicator for dragging.
        canvas.style.cursor = 'grabbing';

        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
        map_Basin_DEM.getSource('point').setData(geojson);
    }

    function onUp(e) {
        var coords = e.lngLat;

        // Print the coordinates of where the point had
        // finished being dragged to on the map.
        coordinates.style.display = 'block';
        coordinates.innerHTML =
            'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
        canvas.style.cursor = '';

        // Unbind mouse/touch events
        map_Basin_DEM.off('mousemove', onMove);
        map_Basin_DEM.off('touchmove', onMove);
    }

    map_Basin_DEM.on('load', function () {
        // Add a single point to the map.
        map_Basin_DEM.addSource('point', {
            'type': 'geojson',
            'data': geojson
        });

        map_Basin_DEM.addLayer({
            'id': 'point',
            'type': 'circle',
            'source': 'point',
            'paint': {
                'circle-radius': 10,
                'circle-color': '#F84C4C' // red color
            }
        });

        // When the cursor enters a feature in
        // the point layer, prepare for dragging.
        map_Basin_DEM.on('mouseenter', 'point', function () {
            map_Basin_DEM.setPaintProperty('point', 'circle-color', '#3bb2d0');
            canvas.style.cursor = 'move';
        });

        map_Basin_DEM.on('mouseleave', 'point', function () {
            map_Basin_DEM.setPaintProperty('point', 'circle-color', '#3887be');
            canvas.style.cursor = '';
        });

        map_Basin_DEM.on('mousedown', 'point', function (e) {
            // Prevent the default map drag behavior.
            e.preventDefault();

            canvas.style.cursor = 'grab';

            map_Basin_DEM.on('mousemove', onMove);
            map_Basin_DEM.once('mouseup', onUp);
        });

        map_Basin_DEM.on('touchstart', 'point', function (e) {
            if (e.points.length !== 1) return;

            // Prevent the default map drag behavior.
            e.preventDefault();

            map_Basin_DEM.on('touchmove', onMove);
            map_Basin_DEM.once('touchend', onUp);
        });
    });
