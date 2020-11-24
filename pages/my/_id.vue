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


  <nuxt-link to="/" style="position: fixed; top: 2rem; right: 2rem;"><img src="/close.svg" alt="Fechar" style="filter: brightness(100); width: 3rem; "></nuxt-link>
  
<input type="text" :value="`https://projetoemotions.com/my/${person._id}`" id="myInput" style="opacity: 0; width: 0">
    <div class="white" style="margin-right: 10rem">
      <Blob :Person="person" />
    </div>
    <div style="z-index: 99999; margin-left: 10rem; position: relative;">
      <span style="position: absolute; right: 105%;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    -webkit-text-orientation: sideways-right;
    text-orientation: sideways-right;">{{person.Location.Lat.toFixed(4)}}, {{person.Location.Long.toFixed(4)}}</span>
      <!--nuxt-link to="/" style="background: white; padding: 1rem; color: black; display: block: margin-bottom: 1rem;">Voltar</nuxt-link-->

      <figure class="image-blob">
        <img
          :src="
            'https://uam-emotions.s3.us-east-2.amazonaws.com/' + person.ImageURL
          "
        />
        <div
          class="blob-marker"
          v-if="person.Tag != 'webcam'"
          :style="`
        
    width: ${person.BoundingBox.Width * 100}%;
    height: ${person.BoundingBox.Height * 100}%;
    left: ${person.BoundingBox.Left * 100}%;
    top: ${person.BoundingBox.Top * 100}%;
    `"
        ></div>

        <figure
          class="image-zoom"
          v-if="
            (person.BoundingBox.Width < 0.02) |
              (person.BoundingBox.Height < 0.02)
          "
        >
          <img
            :src="
              'https://uam-emotions.s3.us-east-2.amazonaws.com/' +
              person.ImageURL
            "
            :style="`
          object-fit: none;
          width: 100%;
          height: 100%;
          object-position:${person.BoundingBox.Left * 100}% ${
              person.BoundingBox.Top * 100 + person.BoundingBox.Height * 50
            }%
    `"
          />
        </figure>
      </figure>

      <table class="table-emotions">
        <div class="table-emotions-items">
          <div class="table-emotions-item" v-if="person.Smile.Value | person.MouthOpen.Value">
            <img src="/smile.svg" alt="" class="table-emotions-svg">
          </div>
          <div class="table-emotions-item" v-if="person.Eyeglasses.Value">
            <img src="/eyeglasses.svg" alt="" class="table-emotions-svg">
          </div>
          <div class="table-emotions-item" v-if="person.EyesOpen.Value">
            <img src="/eye.svg" alt="" class="table-emotions-svg">
          </div>
          <div class="table-emotions-item" v-if="person.Mustache.Value | person.Beard.Value">
            <img src="/beard.svg" alt="" class="table-emotions-svg">
          </div>
          <div class="table-emotions-item" v-if="person.Gender.Value == 'Male'">
            <img src="/male.svg" alt="" class="table-emotions-svg">
          </div>
          <div class="table-emotions-item" v-if="person.Gender.Value == 'Female'">
            <img src="/female.svg" alt="" class="table-emotions-svg">
          </div>
          <div class="table-emotions-item share" style="margin-top: 1.5rem" @click="copyLink">
            <img src="/share.svg" alt="" class="table-emotions-svg">
          </div>
        </div>
        <tr
          v-for="emotion in person.Emotions"
          v-bind:key="emotion._id"
          style="margin-top: 2rem"
        >
          <td
            style="
              padding-right: 1rem;
              text-transform: uppercase;
              font-weight: regular;
              letter-spacing: 2px;
              text-shadow: 1px 1px 1px black;
            "
          >
            {{ translate[emotion.Type] }}
          </td>
          <td style="width: 100%">
            <div style="width: 100%; height: 3px">
              <div
                :style="`height: 3px; background: ${
                  colors[emotion.Type]
                }; width:${Math.log(emotion.Confidence + 1)/Math.log(person.Emotions[0].Confidence+1)*100}%`"
              ></div>
            </div>
          </td>
        </tr>
      </table>
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
        CONFUSED: "#666766",
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
      },
    };
  },
  created() {
    document.body.classList.add("dark");
  },
  destroyed() {
    document.body.classList.remove("dark");
  },
  methods: {
 copyLink() {
  /* Get the text field */
  var copyText = document.getElementById("myInput");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Link copiado! " + copyText.value);
}
  },
  async asyncData({ params, $axios }) {
    try {
      const person = await $axios.get(`/sentiments/${params.id}`);
      console.log(person.data);
      return { person: person.data };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>


<style >

.table-emotions-items {
  position: absolute;
  bottom: 0;
  left: 105%;
}

.table-emotions-item {
    padding: 0.25rem;
    border: 2px solid var(--text-color);
    margin: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.share {
  background-color: var(--text-color);
  cursor: pointer;
}

.share 
.table-emotions-svg {
filter: brightness(0);
}
.table-emotions-svg {
filter: brightness(100);
width: 1.5rem;
height: auto;
}


.table-emotions {
  margin-top: 2rem;
  width: 100%;
  position: relative;
}
.table-emotions td {
  padding-top: 1rem;
}
.white .line-age {
  stroke: white !important;
}

.white .confused {
  filter: brightness(100);
}

.white {
  z-index: 0;
  transform: scale(2.5);
}

.image-blob {
  max-height: 300px;
  width: auto;
  min-width: 300px;
  position: relative;
  background: grey;
}

.image-blob img {
  width: auto;
  max-height: 300px;
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
  bottom: -10%;
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