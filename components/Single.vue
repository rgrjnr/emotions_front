<template>
    <div style="display: flex; width: 100vw; min-height: 100vh; justify-content: space-around; align-items: center; background: black; color: white">
        <div class="white">

        <Blob :Person="person" />   
        </div>
        <div>
            <nuxt-link to="/" style="background: white; padding: 1rem; color: black; display: block: margin-bottom: 1rem;">Voltar</nuxt-link>
            
            
            <h2 style="margin-top: 2rem;">{{person._id}}</h2>

            <div v-for="emotion in person.Emotions" v-bind:key="emotion._id">
                <strong>{{emotion.Type}}</strong> / {{emotion.Confidence}}
            </div>
        </div>
    </div>    
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    try {
      const person = await $axios.get(`/sentiments/${this.id}`);
      console.log(person.data);
      return { person: person.data };
    } catch (err) {
      console.log(err);
    }
  },
}
</script>


<style>

.white .line-age {
  stroke: white!important;
}

</style>