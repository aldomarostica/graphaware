import { createStore } from 'vuex';
import jsonData from '../assets/example-data.json';
import { uuid } from 'vue-uuid';

export default createStore({
    state: {
        myTableData: [],
        loadKids: [],
        collapse: [],
        loading: false
    },
    mutations: {
        updateMyTableData(state, payload){
            state.myTableData = payload;
        },
        deleteItem(state, uuid){
            const filterData = (el) => {
                if(el.uuid === uuid) {
                    return false
                }
                if(Object.keys(el.kids)[0] && el.kids[Object.keys(el.kids)[0]].records){
                    el.kids[Object.keys(el.kids)[0]].records = el.kids[Object.keys(el.kids)[0]].records.filter(filterData);
                }
                return true
            }
              
            state.myTableData = state.myTableData.filter(filterData);
        },
        toggleCollapse(state, index){
            state.collapse[index] = !state.collapse[index];
        },
        loadKids(state, index){
            state.loadKids[index] = true;
        },
        setLoading(state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        deleteItem({ commit }, uuid){
            commit('deleteItem', uuid);
        },
        toggleExpand({ commit }, index){
            commit('toggleCollapse', index);
            
            if(this.state.collapse[index] && !this.state.loadKids[index]){
                commit('loadKids', index);
            }
        },
        getMyTableData({commit}) {
            const addUUId = (jsonData) => {
                return jsonData.map((item) => {
                    item['uuid'] = uuid.v4();
                    if(Object.keys(item.kids)[0] && item.kids[Object.keys(item.kids)[0]].records){
                        addUUId(item.kids[Object.keys(item.kids)[0]].records); 
                    }
                    return item;
                });
            }
            commit('setLoading', true);
            commit('updateMyTableData', addUUId(jsonData)); //pretending jsonData it's coming from API call
            commit('setLoading', false);   
        }
    },
    getters: {
        myTableData(state) {
            return state.myTableData
        }
    }
});