<template>
  <div class="list-box ui-sortable" :data-code="content.code" :style="oStyle">
    列表
    <DeleteCp :aIndex="aIndex"></DeleteCp>
  </div>
</template>

<script>
  import DeleteCp from "@/components/DeleteCp";
  
  export default {
    name: 'List',
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
