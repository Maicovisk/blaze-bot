
var app = new Vue({
    el: '#app',
    mounted: function() {
        this.getApi()
        
        setInterval(() => {
            this.getApi()
        }, 2 * 1000);
    },
    data: {
        dados: [],
    },

    watch: {
    },

    methods: {
        getApi: async function () {
            let data = await axios.get('https://api-blaze.azurewebsites.net/bet')
            data = data.data
            this.dados = data 
        }
    }
  })