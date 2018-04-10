<template>
  <div class="nav-box ui-sortable" :data-code="content.code" :style="oStyle">
    <a>
      首页
    </a>
    <a>
      自己
    </a>
    <DeleteCp :aIndex="aIndex"></DeleteCp>
  </div>
</template>

<script>
  import DeleteCp from "@/components/DeleteCp";
  
  export default {
    name: 'Nav',
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
