<template>
  <table>
    <thead>
      <tr>
        <th><!-- collapse button --></th>
        <th v-for="(item,index) in myTableData[0].data" :key="index">
          {{index}}
        </th>
        <th><!-- delete button --></th>
      </tr>
    </thead>
      <tbody>
        <template v-for="(item,index) in myTableData" :key="index">
          <tr data-bs-toggle="collapse" class="collapsed" :data-bs-target="'#collapse'+index">
            <td><i v-if="!checkEmpty(item.kids)" class="arrow"></i></td>
            <td v-for="(field,indexF) in  item.data" :key="indexF">
              {{field}}
            </td>
            <td><i class="deleteX" @click.prevent="deleteItem(index)"></i></td>
          </tr>
          <template v-if="!checkEmpty(item.kids)">
            <tr :id="'collapse'+index" class="accordion-collapse collapse">
              <td colspan=100 style="padding-right: 0">
                  <RelatedTable 
                    v-for="(kids,indexK) in item.kids"
                    :key="indexK"
                    :node="kids"
                    :depth="1"
                    :prevIndex="index"
                    :title="indexK"
                  />
              </td>
            </tr>
          </template>
        </template>
      </tbody>
  </table>
</template>

<script>
import jsonData from './assets/example-data.json';
import RelatedTable from './components/RelatedTable.vue';

export default {
  name: 'App',
  components: {
    RelatedTable
  },
  data(){
    return {
      myTableData: jsonData
    }
  },
  methods: {
    deleteItem(index){
      this.myTableData.splice(index,1);
    }
  }
}
</script>

<style>
  @import './assets/styles/main.css';
</style>
