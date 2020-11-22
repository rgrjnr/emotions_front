<template>
  <div>
    <div style="position: relative">
      <svg
        :width="size"
        :height="size"
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :style='`filter: blur(${ parseInt( size.replace( /^\D+/g, "") ) * 16 / 480 }px)`'
        class="blob-emotions"
      >

        <g>
          <path :fill="fillA" :d="pathA"></path>
          <path :fill="fillB" :d="pathB"></path>
        </g>
      </svg>
      <svg
        :width="size"
        :height="size"
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="blob-age"
      >
        <g 
        :style='`transform: rotate(${Math.random()*360}deg); transform-origin: 50% 50%;`'>
          <path
            :d="pathAge"
            fill="transparent"
            class="line-age"
          ></path>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Person: {
      required: true,
      type: Object,
    },
    size: {
      required: false,
      type: String,
      default: "480px"
    },
  },
  data() {
    return {
      vertixCountFactor: 1.15,
      radius: 100,
      angle: 0,
      centerX: 240,
      centerY: 240,
      pathA: "",
      pathB: "",
      pathAge: "",
      fillA: "transparent",
      fillB: "transparent",
      pathCoordinates: [],
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    Person: function () {
      this.render();
    },
  },
  methods: {
    render() {
      let colors = {
        FEAR: "#8528fe",
        CALM: "white",
        HAPPY: "#fed62d",
        SAD: "#3924fe",
        ANGRY: "#dc0452",
        CONFUSED: "black",
        DISGUSTED: "#3dd830",
        SURPRISED: "#fd7801",
        UNKNOWN: "transparent",
      };

      if (this.Person) {
        // Primeiro
        this.radius = 100;
        this.centerX = this.centerY = 240;
        this.resetPathData();
        this.generateCoords();

        this.pathA = this.drawCurvyShape();
        this.fillA = colors[this.Person.Emotions[0].Type];

        // Idade
        let age = (this.Person.AgeRange.Low + this.Person.AgeRange.High) / 2;
        this.radius = age*1.2 + 100;
        this.centerX += (0.5 - Math.random()) * 40;
        this.centerY += (0.5 - Math.random()) * 40;
        this.resetPathData();
        this.generateCoords();

        this.pathAge = this.drawCurvyShape();

        // Secundário
        this.radius =
          this.Person.Emotions[1].Confidence /
          this.Person.Emotions[0].Confidence;
        if (this.radius < 50) this.radius = 60;
        this.centerX += (0.5 - Math.random()) * 100;
        this.centerY += (0.5 - Math.random()) * 100;
        this.resetPathData();
        this.generateCoords();

        this.pathB = this.drawCurvyShape();
        this.fillB = colors[this.Person.Emotions[1].Type];
      }
    },

    generateCoords() {
      for (let i = 0; i < 2 * Math.PI; i += this.vertixCountFactor) {
        let x =
          this.radius * Math.cos(i) +
          this.centerX +
          this.getRandomRadiusModifier();
        let y =
          this.radius * Math.sin(i) +
          this.centerY +
          this.getRandomRadiusModifier();
        this.pathCoordinates.push({ x, y });
        if (i + this.vertixCountFactor >= 2 * Math.PI) {
          this.pathCoordinates.push(this.pathCoordinates[0]);
        }
      }
    },

    getRandomRadiusModifier() {
      let num = Math.floor(Math.random() * 10) + 1;
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      return num;
    },

    drawLinearShape() {
      this.pathCoordinates.forEach((coord) => {
        this.path += `${coord.x},${coord.y} `;
      });
    },

    generateLinearShape() {
      resetPathData();
      generateCoords();
      drawLinearShape();
    },

    resetPathData() {
      this.path = "";
      this.pathCoordinates = [];
    },

    catmullRom2bezier() {
      let d = "";
      this.pathCoordinates.forEach((coord, index, array) => {
        let p = [];
        if (index === 0) {
          d += `M${coord.x},${coord.y} `;
          p.push(array[array.length - 3]);
          p.push(array[index]);
          p.push(array[index + 1]);
          p.push(array[index + 2]);
        } else if (index === array.length - 2) {
          p.push(array[index - 1]);
          p.push(array[index]);
          p.push(array[index + 1]);
          p.push(array[0]);
        } else if (index === array.length - 1) {
          return;
        } else {
          p.push(array[index - 1]);
          p.push(array[index]);
          p.push(array[index + 1]);
          p.push(array[index + 2]);
        }
        let bp = [];
        bp.push({ x: p[1].x, y: p[1].y });
        bp.push({
          x: (-p[0].x + 6 * p[1].x + p[2].x) / 6,
          y: (-p[0].y + 6 * p[1].y + p[2].y) / 6,
        });
        bp.push({
          x: (p[1].x + 6 * p[2].x - p[3].x) / 6,
          y: (p[1].y + 6 * p[2].y - p[3].y) / 6,
        });
        bp.push({ x: p[2].x, y: p[2].y });
        d +=
          "C" +
          bp[1].x +
          "," +
          bp[1].y +
          " " +
          bp[2].x +
          "," +
          bp[2].y +
          " " +
          bp[3].x +
          "," +
          bp[3].y +
          " ";
      });

      return d;
    },

    drawCurvyShape() {
      return this.catmullRom2bezier();
    },

    generateCurvyShape() {
      this.resetPathData();
      this.generateCoords();
      this.drawCurvyShape();
    },
  },
};
</script>

<style>
path {
  transition: all 0.3s;
  z-index: -1;
  transform-origin: 50% 50%;
}

.blob-emotions {
  contain: strict;
  stroke-width: 0px;
  background-color: transparent;

  position: absolute;
  top: 0;
}

.blob-age {
  contain: strict;
  stroke-width: 0px;
  background-color: transparent;
}

.line-age {
  stroke: black;
  stroke-width: 1px;
  stroke-dashoffset: 70%;
  stroke-dasharray: 200% 30%;
}
/*
path:hover {
  transform: scale(1.1);
  z-index: 1;
}
*/
</style>