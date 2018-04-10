<template>
  <div class="image-box ui-sortable" :data-code="content.code" :style="oStyle">
    <img src="../assets/logo.png" />
    <DeleteCp :aIndex="aIndex"></DeleteCp>
  </div>
</template>

<script>
  import DeleteCp from "@/components/DeleteCp";
  
  export default {
    name: 'Img',
    props: {
      content: Object,
      oStyle: Object,
      aIndex: Number
    },
    components: {
      DeleteCp
    },
    data(){
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

</style>
