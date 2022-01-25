import { createStore } from 'vuex';
import { uuid } from 'vue-uuid';
import jsonData from '../assets/example-data.json';

interface TableRow {
    filter(filterData: (el: TableRow) => boolean): TableRow[];

    uuid: string,
    data: Record<string, string>;
    kids: Record<string, { records: TableRow[] }>;
}

interface StateUUid {
    [name: string]: boolean
}

interface payloadDeleteItem{
    rootIndex: number,
    uuid: string
}

export default createStore({
    state: {
        myTableData: [] as unknown as TableRow[],
        loadKids: {} as StateUUid,
        collapse: {} as StateUUid,
        loading: false
    },
    mutations: {
        initMyTableData(state, payload: TableRow[]): void{
            state.myTableData = payload;
        },
        /**
         * Delete element by uuid from myTableData searching it within the branch defined by rootIndex
         *
         * @param {number} rootIndex the original root index where uiid comes from.
         * @param {string} uuid unique identifier.
         */
        deleteItem(state, {rootIndex, uuid}: payloadDeleteItem): void {
            const filterData = (el: TableRow): boolean => {
                if(el.uuid === uuid) {
                    return false
                }
                if(Object.keys(el.kids)[0] && el.kids[Object.keys(el.kids)[0]].records){
                    el.kids[Object.keys(el.kids)[0]].records = el.kids[Object.keys(el.kids)[0]].records.filter(filterData);
                }
                return true
            }
              
            const filteredData = [state.myTableData[rootIndex]].filter(filterData);

            if(filteredData.length)
                state.myTableData[rootIndex] = filteredData[0];
            else state.myTableData.splice(rootIndex,1);

        },
        toggleCollapse(state, index: string) : void{
            state.collapse[index] = !state.collapse[index];
        },
        loadKids(state, index: string): void{
            state.loadKids[index] = true;
        },
        setLoading(state, loading: boolean): void{
            state.loading = loading;
        }
    },
    actions: {
        deleteItem({ commit }, {rootIndex, uuid}: payloadDeleteItem): void{
            commit('deleteItem', {rootIndex: rootIndex, uuid: uuid});
        },
        toggleExpand({ commit }, index: string): void{
            commit('toggleCollapse', index);
            
            if(this.state.collapse[index] && !this.state.loadKids[index]){
                commit('loadKids', index);
            }
        },
        initMyTableData({commit}): void {
            const addUUId = (jsonData: Array<any>) => {
                return jsonData.map((item: any) => {
                    item['uuid'] = uuid.v4();
                    if(Object.keys(item.kids)[0] && item.kids[Object.keys(item.kids)[0]].records){
                        addUUId(item.kids[Object.keys(item.kids)[0]].records); 
                    }
                    return item;
                });
            }
            commit('setLoading', true);
            commit('initMyTableData', addUUId(jsonData)); //pretending jsonData it's coming from API call
            commit('setLoading', false);   
        }
    },
    getters: {
        myTableData(state): TableRow[] {
            return state.myTableData
        }
    }
});