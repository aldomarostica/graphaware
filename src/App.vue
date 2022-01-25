<template>
  <div v-if="loading">loading...</div>
  <table>
    <thead>
      <tr>
        <th><!-- collapse button --></th>
        <th v-for="(item,key,index) in myTableData[0].data" :key="'TH-'+myTableData[0].uuid+'_'+index">
          {{key}}
        </th>
        <th><!-- delete button --></th>
      </tr>
    </thead>
      <tbody>
        <template v-for="(item,index) in myTableData" :key="'TR-'+item.uuid">
          <tr v-bind:class="{'collapsed': !collapse[item.uuid] }">
            <!-- render arrow only if the record has childs -->
            <td @click="$store.dispatch('toggleExpand', item.uuid)">
              <i v-if="!checkEmpty(item.kids)"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse'+item.uuid" 
                class="arrow">
              </i>
            </td>
            <td v-for="(field,keyF,indexF) in  item.data" :key="'RF-'+item.uuid+'_'+indexF">
              {{field}}
            </td>
            <td><i class="deleteX" @click.prevent="$store.dispatch('deleteItem',  {rootIndex: index , uuid: item.uuid })"></i></td>
          </tr>
          <!-- render only if the record has childs -->
          <tr :id="'collapse'+item.uuid" class="accordion-collapse collapse" v-bind:class="{ 'show': collapse[item.uuid] }" v-if="!checkEmpty(item.kids) && loadKids[item.uuid]">
            <td colspan=100 style="padding-right: 0">
                <RelatedTable
                  v-for="(kids,key,indexK) in item.kids"
                  :key="'RT-'+item.uuid+'_'+indexK"
                  :node="kids"
                  :title="key"
                  :rootIndex="index"
                />
            </td>
          </tr>
        </template>
      </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import RelatedTable from './components/RelatedTable.vue';
  import { mapState } from "vuex";

  export default defineComponent({
    name: 'App',
    components: {
      RelatedTable
    },
    created(): void{
      this.$store.dispatch('initMyTableData');
    },
    computed: {
      ...mapState([
        'myTableData',
        'loadKids',
        'collapse',
        'loading'
      ])
    }

  })
</script>

<style>
  @import './assets/styles/main.css';
</style>