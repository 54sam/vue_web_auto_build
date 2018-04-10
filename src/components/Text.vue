<template>
  <div class="text-box ui-sortable" :data-code="content.code" :style="oStyle">
    wenben
    <DeleteCp :aIndex="aIndex"></DeleteCp>
  </div>
</template>

<script>
  import DeleteCp from "@/components/DeleteCp";
  
  export default {
    name: 'oText',
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
