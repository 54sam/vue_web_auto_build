import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// window.sessionStorage.removeItem('localData');
let sortApi = [];
let localData = JSON.parse(window.sessionStorage.getItem('localData'));

if (localData !== null){
  sortApi = localData
}

const store = new Vuex.Store({
  state: {
    sortApi,        // 组件配置
    editIndex: 0,   // 当前编辑索引
    editShow: true, // 控制编辑框显示/隐藏
    partEdit: false // 是否为局部编辑
  },
  mutations: {
    setCommon(state){
      let arg = arguments[1];
      if (arg.hasOwnProperty('index') && arg.hasOwnProperty('flag')){
        let timer = null;
        if (state.editIndex === arg['index']){ //样式编辑栏假装切换
          state.editShow = arg['flag'];
        } else{
          state.editShow = !arg['flag'];
          clearTimeout(timer);
          timer = setTimeout(() =>{
            state.editShow = arg['flag'];
          }, 150);
        }
        state.editIndex = arg['index'];
      }
    },
    sortCp(state, res){
      let Target = state.sortApi[res.oldIndex];
      let aIndex = res.newIndex;
      state.sortApi.splice(res.oldIndex, 1);
      state.sortApi.splice(res.newIndex, 0, Target);
      store.commit('setCommon', {flag: true, index: aIndex});
    },
    addCp(state, res){
      let cmType = res.item.getAttribute('type');
      let cmTitle = res.item.innerText;
      let dataTime = new Date().getTime();
      let dataCode = cmType + dataTime;
      let aIndex = res.newIndex;
      let uiComponent = {
        component: cmType,
        editPartShow: false,
        content: {
          text: cmTitle,
          code: dataCode
        },
        style: {},
      };
      state.sortApi.splice(res.newIndex, 0, uiComponent);
      res.item.remove();
      store.commit('setCommon', {flag: true, index: aIndex});
    },
    deleteCp(state, index){

      state.sortApi.splice(index, 1)
    }
  },
  actions: {}
});

export default store
