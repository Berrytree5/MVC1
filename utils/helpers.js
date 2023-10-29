const dayjs = require ("dayjs")

module.exports = {
formatDate: function (timestamp) {
  console.log (timestamp)
 return dayjs (timestamp).format("YYYY-MM-DD") 
}

}
