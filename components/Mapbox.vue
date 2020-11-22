<template>
  <div class="page-container">
    <div class="column-2">
      <h2>Como os sentimentos se espalham pela cidade</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem nesciunt
        et pariatur. Nulla ducimus magni assumenda atque, excepturi dolores
        distinctio necessitatibus ab. Provident esse, inventore sequi expedita
        nemo consequatur adipisci!
      </p>
    </div>
    <div class="column-3">
      <div
        id="map"
        style="height: 80vh; overflow: initial; position: relative;"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmFya3M3IiwiYSI6ImNrZzFkMDl1YTAxanUyc21zODgwcmRnaG0ifQ.v5XHkOAnW7WYgtmqz3wAkg";
    var map = new mapboxgl.Map({
      container: "map",
      minZoom: 13,
      style: "mapbox://styles/barks7/ckgh77uyk2khp19qhu4eqhzku",
    });

    map.on("mouseover", function () {
      window.allow_scroll = false;
    });
    map.on("mouseout", function () {
      window.allow_scroll = true;
    });
  },
};
</script>