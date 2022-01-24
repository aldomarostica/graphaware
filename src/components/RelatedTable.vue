<template>
    <!-- relation title -->
    <h4>{{ title }}</h4>
    <table v-if="node.records">
        <thead>
            <tr>
                <th><!-- collapse button --></th>
                <th v-for="(field,key,index) in node.records[0].data" :key="'TH-'+node.records[0].uuid+'_'+index">
                    {{key}}
                </th>
                <th><!-- delete button --></th>
            </tr>
        </thead>
        <tbody>
            <template v-for="item in node.records" :key="'TR-'+item.uuid">
                <tr v-bind:class="{'collapsed': !collapse[item.uuid] }">
                    <!-- render arrow only if the record has childs -->
                    <td @click="$store.dispatch('toggleExpand', item.uuid)">
                        <i v-if="!checkEmpty(item.kids)" 
                            class="arrow" 
                            data-bs-toggle="collapse" 
                            :data-bs-target="'#collapse'+item.uuid">
                        </i>
                    </td>
                    <td v-for="(field,keyF,indexF) in item.data" :key="'RF-'+item.uuid+'_'+indexF">
                        {{field}}
                    </td>
                    <td><i class="deleteX" @click.prevent="$store.dispatch('deleteItem', item.uuid)"></i></td>
                </tr>
                <!-- render only if the record has childs -->
                <tr :id="'collapse'+item.uuid" class="accordion-collapse collapse" v-bind:class="{ 'show': collapse[item.uuid] }" v-if="!checkEmpty(item.kids) && loadKids[item.uuid]">
                    <td colspan=100 style="padding-right: 0">
                        <RelatedTable 
                            v-for="(record,keyK,indexK) in item.kids"
                            :key="'RT-'+item.uuid+'_'+indexK"
                            :node="record"
                            :title="keyK"
                        />
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState } from "vuex";

    export default defineComponent({
        name: 'RelatedTable',
        props: {
            node: {
                type: Object
            },
            title: {
                type: String
            }
        },
        computed: {
            ...mapState([
                'loadKids',
                'collapse'
            ])
        }
    })
</script>