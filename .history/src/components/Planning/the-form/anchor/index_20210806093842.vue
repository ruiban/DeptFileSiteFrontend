<template>
    <anchor v-if="pageBlock" ref="anchor" :page-block="pageBlock"/>
</template>
<script>
import Anchor from '../Anchor.vue'
import Anchor from './Anchor'
export default {
    components: {
        Anchor
        Anchor
    },
    props: {
        pageBlock: HTMLElement
    },
    methods: {
        reRender() {
            this.$nextTick(()=>{
                this.$refs['anchor'].reRender()
            })
        }
    }
}
</script>