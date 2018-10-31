/* eslint no-new: "off" */
/* eslint no-undef: "off" */

import React from 'react';

class Map extends React.Component {
  static moveMapToDetroit(map) {
    map.setCenter({ lat: 42.3314, lng: -83.0458 });
    map.setZoom(12);
  }

  constructor(props) {
    super(props);

    this.mapMoved = this.mapMoved.bind(this);
    this.onSearchResult = this.onSearchResult.bind(this);
  }

  componentDidMount() {
    /**
     * Boilerplate map initialization code starts below:
     */

    // Step 1: initialize communication with the platform
    const platform = new H.service.Platform({
      app_id: 'VMMbQsye9h1e2AfDnZb3',
      app_code: 'ETlhI8yx52mFcbhmU56pHw',
      useHTTPS: true,
    });
    const pixelRatio = window.devicePixelRatio || 1;
    const defaultLayers = platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320,
    });

    // Step 2: initialize a map  - not specifying a location will give a whole world view.
    this.map = new H.Map(
      document.getElementById('map'),
      defaultLayers.normal.map,
      { pixelRatio },
    );

    // this.map = map;

    // Enable the event system on the map instance:
    // var mapEvents = new H.mapevents.MapEvents(map);

    // Add event listeners:
    this.map.addEventListener('dragend', this.mapMoved);

    // Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    Map.moveMapToDetroit(this.map);

    this.searchService = new H.places.Search(platform.getPlacesService());
    this.exploreService = new H.places.Explore(platform.getPlacesService());
  }

  componentWillUnmount() {
    // Release any resources.
  }

  mapMoved() {
    const searchParams = {
      cat: 'shopping',
      in: this.map.getCenter().lat + ',' + this.map.getCenter().lng + ';r=100',
    };

    this.exploreService.request(
      searchParams,
      {},
      this.onSearchResult,
      () => {},
    );
  }

  onSearchResult(data) {
    if (data && data.results) {
      data.results.items.map(item =>
        this.map.addObject(
          new H.map.Marker({ lat: item.position[0], lng: item.position[1] }),
        ),
      );
      window.onNearbyGroceryStores(data.results.items.length > 0);
    }
  }

  render() {
    return (
      <div
        id="map"
        style={{ width: '100%', height: '400px', background: 'grey' }}
      />
    );
  }
}

export default Map;
