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
                channel_options: [
                    {
                        value: "线下普通渠道",
                        label: "线下普通渠道",
                        children: [
                            {
                                value: "线下普通渠道",
                                label: "线下普通渠道",
                            },
                        ],
                    },
                    {
                        value: "线下专供渠道",
                        label: "线下专供渠道",
                        children: [
                            {
                                value: "苏宁卖场",
                                label: "苏宁卖场",
                            },
                            {
                                value: "国美卖场",
                                label: "国美卖场",
                            },
                        ],
                    },
                ],
            }
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
            return this.formType === 'detail'
        }
    },
    inject: ['formType'],
}