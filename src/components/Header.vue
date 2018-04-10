<template>
  <div class="header-box ui-sortable" :data-code="content.code" :style="oStyle">
    头部
    <DeleteCp :aIndex="aIndex"></DeleteCp>
  </div>
</template>

<script>
  import DeleteCp from "@/components/DeleteCp";
  
  export default {
    name: 'oHeader',
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
