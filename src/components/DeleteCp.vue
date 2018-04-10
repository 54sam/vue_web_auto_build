<template>
  <div class="delete-compontent-box">
    <div class="el-icon-delete remove-component" @click.stop="dailogStatu"></div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="430px">
      <div class="el-message-box__content">
        <div class="el-message-box__status el-icon-warning"></div>
        <div class="el-message-box__message dialog-message">此操作将删除该模块, 是否继续?</div>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="onRemove(aIndex)" size="small">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  
  export default {
    name: 'oText',
    props: {
      aIndex: Number
    },
    data(){
      return {
        dialogVisible: false,
        appendToBody: true
      }
    },
    methods: {
      ...mapMutations(['deleteCp', 'setCommon']),
      dailogStatu(){
        this.dialogVisible = true;
        this.setCommon({flag: true, index: this.aIndex})
      },
      onRemove(index){
        let flag = false;
        this.deleteCp(index);
        this.dialogVisible = false;
        this.$message({
          message: '该模块已删除 !',
          type: 'success'
        });
        this.setCommon({flag: false, index: 0})
      }
    }
  }
</script>

<style>
  .remove-component {
    cursor: pointer;
  }
  
  .el-dialog__body {
    padding: 0;
  }
  
  .dialog-message {
    font-size: 18px;
  }
</style>
