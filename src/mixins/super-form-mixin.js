import { easyClone } from '@/util/index.js'
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            FormData: {}
        }
    },
    watch: {
        data: {
            handler(newVaule) {
                this.formData = easyClone(newVaule) || {}
            },
            immediate: true
        }
    },
    methods: {
        validForm() {
            let result = false
            this.$refs['form'].validate((valid) => { result = valid })
            return result
        }
    },
    computed: {
        formDisabled() {
            return this.formType === 'add'
        }
    },
    inject: ['formType'],
}