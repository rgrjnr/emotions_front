<template>
<div class="page-container">
  <div class="column-1">
    <h2>Explorar</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quasi consequuntur nostrum cumque, fuga molestias illo quis dolorum molestiae sit. Debitis magni excepturi laboriosam enim, quis veniam nesciunt maiores quae.
    </p>
  </div>
  <div class="column-3">

  <div
    class="container"
    style="
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto; max-width: 100vw; max-height:60vh; flex-wrap: wrap"
  >
    <nuxt-link
      :to="`/my/${person._id}`"
      v-for="person in people"
      v-bind:key="person._id"
    >
      <blob :Person="person" size="150px" />
    </nuxt-link>
  </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      people: null
    };
  },
  async created() {
    const { data } = await this.$axios.get('/sentiments/?limit=35&random=true')
    console.log(data)
    this.people =  data.people;
  },
  methods: {
    async sendPicture() {
      try {
        const req = await this.$axios.$post(
          "/binary",
          {
            ImageBinary: this.img,
            Tag: "webcam",
          }
        );
        this.person = req.FaceDetails[0];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
