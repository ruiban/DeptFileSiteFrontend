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
            formData: {
            }
        }
    },
    watch: {
        data: {
            handler(newValue) {
                this.formData = easyClone(newValue) || {}
            },
            immediate: true,
        },
        'data.formData.channel_options': {
            
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
            return this.formType === 'detail'
        }
    },
    inject: ['formType'],
}