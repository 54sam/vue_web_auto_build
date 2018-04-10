<template>
  <div class="btn-edit ui-edit"
       :data-code="content.code"
       v-if="aIndex === currentIndex">
    <el-collapse v-model="btnModel"
                 class="base-edit"
                 accordion ref="content.code">
      <el-collapse-item title="按钮信息" name="btnModel">
        <el-form ref="form" :model="btnConfig" size="mini">
          <el-form-item class="cui-inline-reset"
                        :label="btnConfig.btnName">
            <el-input v-model="content.text"></el-input>
          </el-form-item>
        </el-form>
      
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'Btn',
    props: {
      content: Object,
      oStyle: Object,
      aIndex: Number,
      currentIndex: Number
    },
    components: {},
    data(){
      return {
        btnModel: 'btn-model',
        btnConfig: {
          btnName: '按钮名称'
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
