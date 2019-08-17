<template>
  <div
    ref="heatmap"
    id="map"
    :style="`width: ${mapWidth}; height: ${mapHeight}`"/>
</template>

<script>
export default {
  name: 'c-heat-map',
  props: {
    lat: {
      type: Number,
      default: () => 37.775,
    },
    lng: {
      type: Number,
      default: () => -122.434,
    },
    initialZoom: {
      type: Number,
      default: () => 13,
    },
    mapType: {
      type: String,
      default: () => 'roadmap',
    },
    points: {
      type: Array,
      required: true,
    },
    width: {
      type: [String, Number],
      default: () => '100%',
    },
    height: {
      type: [String, Number],
      default: () => '100%',
    },
    opacity: {
      type: Number,
      default: () => 1,
    },
    maxIntensity: {
      type: Number,
      default: () => 5,
    },
  },
  computed: {
    mapWidth() {
      return `${this.width}px`;
    },
    mapHeight() {
      return `${this.height}px`;
    },
    heatmapPoints() {
      return this.points.map(
        // eslint-disable-next-line
        point => new google.maps.LatLng(point.lat, point.lng)
      );
    },
  },
  mounted() {
    return this.$gmapApiPromiseLazy().then(() => {
      // eslint-disable-next-line
      let center = {lat: -34.593272, lng: -58.528348};

      if (this.lat && this.lng) {
        center = new google.maps.LatLng(this.lat, this.lng);
      }

      this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center,
        mapTypeId: this.mapType,
      });

      // eslint-disable-next-line
      this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        map: this.$mapObject,
        opacity: this.opacity,
        maxIntensity: this.maxIntensity,
      });

      this.$heatmap.setMap(this.$mapObject);
    });
  },
};
</script>
<style>
  #map {
    position: initial !important;
  }
</style>
