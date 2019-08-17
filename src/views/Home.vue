<template>
  <div class="home">
    <heat-map :points="locations" :lat="parseFloat(this.center.lat)"
    :lng="parseFloat(this.center.lng)"
    :width="600"
    :height="500"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import HeatMap from '@/components/HeatMap.vue';

export default {
  name: 'home',
  components: {
    HeatMap,
  },
  data() {
    return {
      locations: [],
      center: {},
    };
  },
  async created() {
    try {
      const response = await axios.get('locations.json');
      const result = response.data;
      const locations = result.locations.map((val) => {
        return {
          lat: val.latitudeE7 * (10 ** -7),
          lng: val.longitudeE7 * (10 ** -7),
        };
      });

      this.locations = locations.slice(100000, 150000);

      this.center = {
        lat: this.locations[this.locations.length - 1].lat,
        lng: this.locations[this.locations.length - 1].lng,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
