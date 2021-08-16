<template>
  <div>
       <v-input>
            <v-text-field label="Search" prepend-icon="mdi-magnify" v-model="search_people" @change="handleSearch(page)"></v-text-field>
       </v-input>
  </div>
</template>

<script>
export default {
    props:['']
}
</script>

<style>

</style>