<template>
  <div class="body">

    <div
      v-for="page in pages"
      v-bind:key="`menu-${page.index}`"
      :id="`menu-${page.index}`"
      v-bind:class="{
        'menu-fixed': true,
        menu: true,
        read: current_page >= page.index,
        first_visible:
          visible_pages[page.index] & visible_pages[page.index + 1],
        second_visible:
          visible_pages[page.index] & visible_pages[page.index - 1],
        only_visible:
          visible_pages[page.index] &
          !visible_pages[page.index - 1] &
          !visible_pages[page.index + 1],
      }"
    >
      <div class="menu-inside">
        <a class="menu-inside__link" href="#" @click="scrollTo(page.index)">{{
          page.name
        }}</a>
      </div>
    </div>
    <div
      v-for="page in pages"
      v-bind:key="`page-${page.index}`"
      class="page"
      v-observe-visibility="visibilityChanged"
      :id="`page-${page.index}`"
    >
      <div class="menu menu-page">{{ page.name }}</div>
      <div class="content">
        <component :is="page.component" />
      </div>
    </div>
  </div>
</template> 
<script>
import intersect from "vue-intersect";
import { ObserveVisibility } from "vue-observe-visibility";
import { VueScrollTo } from "vue-scrollto";
import Home from "~/components/Home";
import Mapbox from "~/components/Mapbox";
import Insights from "~/components/Insights";
import Explore from "~/components/Explore";
import Camera from "~/components/Camera";
import About from "~/components/About";

export default {
  components: {
    intersect,
    Home,
    Mapbox,
    Insights,
    Explore,
    About,
    Camera,
  },
  data() {
    return {
      current_page: 1,
      visible_pages: {},
      pages: [
        {
          index: 1,
          name: "Início",
          component: "Home",
          dark: true
        },
        {
          index: 2,
          name: "Sobre o projeto",
          component: "About",
          dark: true
        },
        {
          index: 3,
          name: "Experimente",
          component: "Camera",
          dark: false
        },
        {
          index: 4,
          name: "Explore",
          component: "Explore",
          dark: false
        },
        {
          index: 5,
          name: "Relacione",
          component: "Mapbox",
          dark: false
        },
        {
          index: 6,
          name: "Entenda",
          component: "Insights",
          dark: true
        },
      ],
    };
  },
  created() {},
  methods: {
    scrollTo(page) {
      function getOffset(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }
        return { top: _y, left: _x };
      }

      window.pos = getOffset(document.getElementById(`page-${page}`)).left + (page - 1) * -48;
      
    },
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      const page = entry.target.id.slice(-1);
      this.$set(this.visible_pages, page, isVisible);

      for (const page in this.visible_pages) {
        if (this.visible_pages[page] == true) {
          this.current_page = page;
          document.body.classList.add("active"+page);
        } else {
          
          document.body.classList.remove("active"+page);
        }
      }

      
      document.querySelector('.body').style.marginRight = (this.current_page * 3).toString() + ' rem'

      if (this.pages[this.current_page-1].dark) {
        document.body.classList.add("dark");
      } else { 
         document.body.classList.remove("dark");
      }



      
    },
  },
};
</script>
<style lang="scss">
html {
  overflow-x: hidden;
}

.body {
  display: flex;
  width: auto;
  align-items: stretch;
  height: 100%;
  margin-top: 6rem;
}

.page {
  min-height: 90vh;
  display: flex;
  right: 0;
  position: relative;
}

.menu {
  writing-mode: vertical-rl;
  text-orientation: sideways-right;
  padding: 1rem;
  border-left: 2px solid var(--text-color);
  bottom: 0rem;
  width: 3rem;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.menu-inside__link {
  text-decoration: none;
  color: var(--text-color);
}

.content {
  margin: 2rem;
}

html,
body {
  height: 100%;
  max-height: 100vh;
  touch-action: manipulation;
}

.menu-fixed {
  z-index: 10;
  top: 6rem;
  position: fixed;
  background: var(--bg-color);
  @for $i from 1 through 7 {
    &#menu-#{$i} {
      right: (7-$i) * 3rem - 3rem;
      left: unset;
    }
  }
}

.read {
  border-right: 2px solid var(--text-color);

  border-left: 0;
  @for $i from 1 through 7 {
    &#menu-#{$i} {
      left: ($i * 3rem) - 3rem;
      right: unset;
    }
  }
}

.second_visible {
  display: none;
}

.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>