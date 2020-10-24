Vue.component('server-error', {
    data(){
        return {
            errorText: ''
        }
    },
    methods: {
        setError(error){
            this.errorText = error
        }
    },

    computed: {
        isVisible(){
            return this.errorText != '';
        }
    },

    template: `
        <div class='error' v-if="isVisible">
            {{errorText}}
            <br>
            <button @click="setError('')">закрыть</button>
        </div>`
});