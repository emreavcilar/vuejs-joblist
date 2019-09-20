import * as WebService from "../services/webService";



const state = {
    all: {},
    man:{}
};

const actions = {

    getList({ commit }) {
        // commit('GET_LIST_DATA');

        WebService.getListData()
            /*.then((res)=>{

                if (res.data.statusCode === 200) {}
                // console.log("hello result " , res);
                commit('GET_LIST_DATA',res);
            })*/


            .then((res) => {
                if (res.data.statusCode === 200) {
                    // this.manipulatedDataArr = res.data.result.items;
                    // props.dispatch(listDataResults(res.data.result.items));
                    commit('GET_LIST_DATA',res.data.result.items);
                    commit('SET_MANIPULATED_DATA',res.data.result.items);
                }
            });
    },

    setManipulatedData({commit},data){
        commit('SET_MANIPULATED_DATA',data);
    }

    /*getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },*/

   /* delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    }*/
};

const mutations = {

    GET_LIST_DATA(state,res){
        // console.log("hello sonuç " , res);
        state.all={data:res}
    },
    SET_MANIPULATED_DATA(state,data){
        state.man={manData:data}
    }



   /* getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }*/
};



export const listModule = {
    namespaced: true,
    state,
    actions,
    mutations
};