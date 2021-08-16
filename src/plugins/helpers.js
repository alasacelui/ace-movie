import Vue from 'vue'

const MyPlugin = {
    install(Vue, options) {
      Vue.prototype.formatDate = (date) => {
            const formatted_date = new Date(date)
            return formatted_date.toLocaleDateString() // date format
      },
      Vue.prototype.formatDateToYear = (date) => {
        const formatted_date = new Date(date)
        return formatted_date.getFullYear() // date format (YEAR)
      },
      Vue.prototype.formatToThousand = (val) => {
          return val.toLocaleString() // format to thousand with comma
      }
    },
  }
  Vue.use(MyPlugin)

  export default MyPlugin