import * as WebService from "../services/webService";

const state = {
    all: {}
};

const  actions = {
    getDetail ({commit},id) {
        WebService.getDetailData(id)
            .then((res)=>{
                if(res.data.statusCode === 200){
                    commit('GET_DETAIL_DATA',res.data.result);
                }
            })
    },
    resetDetail ({commit}) {
        commit('RESET_DETAIL_DATA');
    }
};

const mutations = {
    GET_DETAIL_DATA(state,res){
        state.all = {data:res};
    },
    RESET_DETAIL_DATA(){
      state.all = {};
    }
};

export const detailModule = {
    namespaced:true,
    state,
    actions,
    mutations
};