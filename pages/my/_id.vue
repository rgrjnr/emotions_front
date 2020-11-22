<template>
  <div
    class="dark"
    style="
      display: flex;
      width: 100vw;
      min-height: 100vh;
      justify-content: center;
      align-items: center;
      background: var(--bg-color);
      color: white;
      overflow: hidden;
    "
  >
    <div class="white">
      <Blob :Person="person" />
    </div>
    <div style="z-index: 99999; margin-left: 2rem;">
      <!--nuxt-link to="/" style="background: white; padding: 1rem; color: black; display: block: margin-bottom: 1rem;">Voltar</nuxt-link-->

      <figure class="image-blob">
        <img
          :src="
            'https://uam-emotions.s3.us-east-2.amazonaws.com/' + person.ImageURL
          "
        />
        <div
          class="blob-marker"
          :style="`
        
    width: ${person.BoundingBox.Width * 100}%;
    height: ${person.BoundingBox.Height * 100}%;
    left: ${person.BoundingBox.Left * 100}%;
    top: ${person.BoundingBox.Top * 100}%;
    `"
        ></div>
        
      <!--figure class="image-zoom">
        <img
          :src="
            'https://uam-emotions.s3.us-east-2.amazonaws.com/' + person.ImageURL
          "
          :style="`
          object-fit: none;
          width: 100%;
          height: 100%;
          object-position:${
            person.BoundingBox.Left * 100 + person.BoundingBox.Width * 100
          }% ${person.BoundingBox.Top * 100 + person.BoundingBox.Height * 50}%
    `"
        />
      </figure-->
      </figure>


      <div v-for="emotion in person.Emotions" v-bind:key="emotion._id" style="margin-top: 1rem">
        <strong>{{ translate[emotion.Type] }}</strong> <div style="width: 200px; height: 3px;"><div :style="`height: 3px; background: ${colors[emotion.Type]}; width:${ Math.log(emotion.Confidence+1) * 60 }px`"></div></div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

       colors: {
        FEAR: "#8528fe",
        CALM: "white",
        HAPPY: "#fed62d",
        SAD: "#3924fe",
        ANGRY: "#dc0452",
        CONFUSED: "black",
        DISGUSTED: "#3dd830",
        SURPRISED: "#fd7801",
        UNKNOWN: "transparent",
      },
      translate: {
        FEAR: "Medo",
        CALM: "Calma",
        HAPPY: "Felicidade",
        SAD: "Tristeza",
        ANGRY: "Raiva",
        CONFUSED: "Confusão",
        DISGUSTED: "Nojo",
        SURPRISED: "Surpresa",
        UNKNOWN: "Não identificado",
      }
    }
  },
  created() {
    document.body.classList.add("dark");
  },
  destroyed() {
    document.body.classList.remove("dark");
  },
  async asyncData({ params, $axios }) {
    try {
      const person = await $axios.get(
        `http://localhost:3030/sentiments/${params.id}`
      );
      console.log(person.data);
      return { person: person.data };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>


<style >
.white .line-age {
  stroke: white !important;
}

.white {
  z-index: 0;
  transform: scale(2.5) translateX(-10%);
}

.image-blob {
  width: 100%;
  max-width: 20vw;
  height: auto;
  position: relative;
}

.image-blob img {
  width: 100%;
  height: auto;
  filter: grayscale(100%);
}

.blob-marker {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  top: 1rem;
  left: 1rem;
  border: 1px solid white;
  transform: scale(1.5);
  padding: 0.2rem;
  mix-blend-mode: difference;
  animation: scaler 3s infinite alternate ease-in-out;
}

.image-zoom {
  width: 10vw;
  height: 10vw;
  position: absolute;
    bottom: -20%;
    left: -20%;
}

@keyframes scaler {
  from {
    transform: scale(1.5);
  }

  to {
    transform: scale(3.5);
  }
}
</style>