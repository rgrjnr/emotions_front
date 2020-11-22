<template>
  <div class="page-container">
    <div class="column-1">
      <h2>Current Camera</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid atque
        animi ab fuga veritatis a iusto magnam aspernatur! Dignissimos minus
        consectetur error voluptatem veniam, eius atque hic eum officia
        veritatis?
      </p>
    </div>
    <div class="column-3">
      <div class="camera-container">
        <div class="camera-view" v-show="!captured">
          <vue-web-cam
            ref="webcam"
            :device-id="deviceId"
            @started="onStarted"
            @stopped="onStopped"
            @error="onError"
            @cameras="onCameras"
            @camera-change="onCameraChange"
          />
        </div>

        <figure class="camera-preview" v-if="captured">
          <img :src="img" class="img-responsive" />
        </figure>

        <div class="camera-controllers">
          <button
            type="button"
            class="btn btn-primary"
            @click="onCapture"
            v-if="!captured"
          >
            Tirar foto
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="captured = false"
            v-if="captured"
          >
            Tirar nova foto
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="sendPicture"
            v-if="captured"
          >
            Continuar
          </button>
        </div>
      </div>

      <div class="row">
        <div class="text-center">
          <select v-model="camera" class="camera-selector">
            <option>-- Selecione um dispositivo --</option>
            <option
              v-for="device in devices"
              :key="device.deviceId"
              :value="device.deviceId"
            >
              {{ device.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";

export default {
  components: {
    "vue-web-cam": WebCam,
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      captured: false,
      person: {
        BoundingBox: {
          Width: 0.33894580602645874,
          Height: 0.623513400554657,
          Left: 0.3567182421684265,
          Top: 0.3369612693786621,
        },
        AgeRange: {
          Low: 20,
          High: 32,
        },
        Smile: {
          Value: false,
          Confidence: 98.94876098632812,
        },
        Eyeglasses: {
          Value: false,
          Confidence: 94.52527618408203,
        },
        Sunglasses: {
          Value: false,
          Confidence: 97.67118835449219,
        },
        Gender: {
          Value: "Male",
          Confidence: 99.57926177978516,
        },
        Beard: {
          Value: true,
          Confidence: 92.43184661865234,
        },
        Mustache: {
          Value: false,
          Confidence: 62.73377990722656,
        },
        EyesOpen: {
          Value: true,
          Confidence: 96.1456069946289,
        },
        MouthOpen: {
          Value: false,
          Confidence: 93.28826141357422,
        },
        Emotions: [
          {
            Type: "CALM",
            Confidence: 93.76179504394531,
          },
          {
            Type: "SAD",
            Confidence: 1.9164094924926758,
          },
          {
            Type: "ANGRY",
            Confidence: 1.5886329412460327,
          },
          {
            Type: "CONFUSED",
            Confidence: 1.1707215309143066,
          },
          {
            Type: "SURPRISED",
            Confidence: 0.6767540574073792,
          },
          {
            Type: "FEAR",
            Confidence: 0.33866918087005615,
          },
          {
            Type: "DISGUSTED",
            Confidence: 0.28694990277290344,
          },
          {
            Type: "HAPPY",
            Confidence: 0.26006385684013367,
          },
        ],
        Landmarks: [
          {
            Type: "eyeLeft",
            X: 0.4118235111236572,
            Y: 0.5374929904937744,
          },
          {
            Type: "eyeRight",
            X: 0.564903736114502,
            Y: 0.5284050107002258,
          },
          {
            Type: "mouthLeft",
            X: 0.4323459267616272,
            Y: 0.762414813041687,
          },
          {
            Type: "mouthRight",
            X: 0.5603904724121094,
            Y: 0.7551504969596863,
          },
          {
            Type: "nose",
            X: 0.48205798864364624,
            Y: 0.6526671648025513,
          },
          {
            Type: "leftEyeBrowLeft",
            X: 0.3565884232521057,
            Y: 0.4905800223350525,
          },
          {
            Type: "leftEyeBrowRight",
            X: 0.3946249186992645,
            Y: 0.46054115891456604,
          },
          {
            Type: "leftEyeBrowUp",
            X: 0.43747982382774353,
            Y: 0.469361811876297,
          },
          {
            Type: "rightEyeBrowLeft",
            X: 0.5252103209495544,
            Y: 0.46375784277915955,
          },
          {
            Type: "rightEyeBrowRight",
            X: 0.5711582899093628,
            Y: 0.44944992661476135,
          },
          {
            Type: "rightEyeBrowUp",
            X: 0.6223370432853699,
            Y: 0.474182665348053,
          },
          {
            Type: "leftEyeLeft",
            X: 0.38574767112731934,
            Y: 0.5384986996650696,
          },
          {
            Type: "leftEyeRight",
            X: 0.44212841987609863,
            Y: 0.5381847023963928,
          },
          {
            Type: "leftEyeUp",
            X: 0.4103069305419922,
            Y: 0.5263011455535889,
          },
          {
            Type: "leftEyeDown",
            X: 0.4127051830291748,
            Y: 0.5476561784744263,
          },
          {
            Type: "rightEyeLeft",
            X: 0.5345280170440674,
            Y: 0.5326059460639954,
          },
          {
            Type: "rightEyeRight",
            X: 0.5931654572486877,
            Y: 0.526115357875824,
          },
          {
            Type: "rightEyeUp",
            X: 0.5640137791633606,
            Y: 0.5170445442199707,
          },
          {
            Type: "rightEyeDown",
            X: 0.5643249750137329,
            Y: 0.5386263728141785,
          },
          {
            Type: "noseLeft",
            X: 0.46020370721817017,
            Y: 0.6794820427894592,
          },
          {
            Type: "noseRight",
            X: 0.5169529914855957,
            Y: 0.6760905981063843,
          },
          {
            Type: "mouthUp",
            X: 0.48964446783065796,
            Y: 0.7309017777442932,
          },
          {
            Type: "mouthDown",
            X: 0.49348801374435425,
            Y: 0.7990360260009766,
          },
          {
            Type: "leftPupil",
            X: 0.4118235111236572,
            Y: 0.5374929904937744,
          },
          {
            Type: "rightPupil",
            X: 0.564903736114502,
            Y: 0.5284050107002258,
          },
          {
            Type: "upperJawlineLeft",
            X: 0.3373722434043884,
            Y: 0.5502607226371765,
          },
          {
            Type: "midJawlineLeft",
            X: 0.3753942847251892,
            Y: 0.7892777919769287,
          },
          {
            Type: "chinBottom",
            X: 0.5023353099822998,
            Y: 0.9150281548500061,
          },
          {
            Type: "midJawlineRight",
            X: 0.6462582349777222,
            Y: 0.77275151014328,
          },
          {
            Type: "upperJawlineRight",
            X: 0.6708706617355347,
            Y: 0.5293798446655273,
          },
        ],
        Pose: {
          Roll: -3.4743478298187256,
          Yaw: -3.156301259994507,
          Pitch: 1.4501219987869263,
        },
        Quality: {
          Brightness: 45.28564453125,
          Sharpness: 78.64350128173828,
        },
        Confidence: 99.99745178222656,
      },
    };
  },
  computed: {
    device: function () {
      return this.devices.find((n) => n.deviceId === this.deviceId);
    },
  },
  watch: {
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    },
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture();
      this.captured = true;
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    },
    async sendPicture() {
      try {
        const req = await this.$axios.$post(
          "https://api.projetoemotions.com/sentiments/binary",
          {
            ImageBinary: this.img,
            Tag: "webcam",
          }
        );
        this.$router.push({
    path: '/my/' + req.FaceDetails[0]._id
}) ;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.camera-container {
  transform: rotateY(-180deg);
  filter: grayscale(1);
  position: relative;
}

.camera-selector {
  padding: 0.25rem;
  background: none;
  border: none;
}

.camera-preview {
  width: 100%;
  height: 80vh;
  text-align: center;

  img {
    height: 100%;
    object-fit: contain;
  }
}

.camera-controllers {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  transform: rotateY(-180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.links {
  padding-top: 15px;
}

.btn {
  background: black;
  border: none;
  padding: 1rem;
  color: white;
  border-radius: 0;
  margin: 0.5rem;
}

video {
  height: 80vh;
}
</style>
