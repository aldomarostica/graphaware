<template>
    <h4>{{ title }}</h4>
    <table v-if="node.records">
        <thead>
            <tr>
                <th><!-- collapse button --></th>
                <th v-for="(field,index) in node.records[0].data" :key="index">
                    {{ index }}
                </th>
                <th><!-- delete button --></th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(item,index) in node.records" :key="index">
                <tr data-bs-toggle="collapse" class="collapsed" :data-bs-target="'#collapse'+prevIndex+depth+index">
                    <td><i v-if="!checkEmpty(item.kids)" class="arrow"></i></td>
                    <td v-for="(field,indexF) in item.data" :key="indexF">
                        {{field}}
                    </td>
                    <td><i class="deleteX" @click.prevent="deleteItem(index)"></i></td>
                </tr>
                <template v-if="!checkEmpty(item.kids)">
                    <tr :id="'collapse'+prevIndex+depth+index" class="accordion-collapse collapse">
                        <td colspan=100 style="padding-right: 0">
                            <RelatedTable 
                                v-for="(record,indexK) in item.kids"
                                :key="indexK"
                                :node="record"
                                :depth="depth + 1"
                                :prevIndex="prevIndex + 1"
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
    export default {
        name: 'RelatedTable',
        props: {
            node: {
                type: Object
            },
            depth: null,
            prevIndex: null,
            title: null
        },
        methods: {
            deleteItem(index){
                this.$props.node.records.splice(index,1);
            }
        }
    }
</script>