<template>
  <div class="btn-box ui-sortable"
       :data-code="content.code">
    <el-button class="ui-btn"
               :style="oStyle">
      {{ content.text }}
    </el-button>
    <DeleteCp :aIndex="aIndex"></DeleteCp>
  </div>
</template>

<script>
  import DeleteCp from "@/components/DeleteCp";
  
  export default {
    name: 'Btn',
    props: {
      content: Object,
      oStyle: Object,
      aIndex: Number
    },
    components: {
      DeleteCp
    },
    data(){
      return {
        btnModel: 'btn-model'
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
