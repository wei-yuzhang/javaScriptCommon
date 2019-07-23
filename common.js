export default {
  /* 格式化下拉框选择数据
  ** value:当前选中的数据
  ** remoteData:查询获取的总体数据
  ** previewData:上一条数据
  ** key：下拉框的选项的值
  */
  formatSelect: function (value, remoteData, previewData, key) {
    let totalData = ['全部']
    let result = []
    remoteData.forEach(item => {
      totalData.push(item[key])
    })

    // 判断当前选中的数据的长度
    if (value.length) {
      // 上一条数据转换为字符串
      let previewString = previewData.join(',')

      // 上条数据是否有 全部
      const judgePreview = Boolean(previewString.indexOf('全部') !== -1)

      // 当前数据转换为字符串
      let currentString = value.join(',')

      // 当前数据是否有 全部
      const judgeCurrent = Boolean(currentString.indexOf('全部') !== -1)

      // 如果上条数据不是空的
      if (previewData.length > 0) {
        if (judgePreview && judgeCurrent) { // 都存在全部
          value.forEach((item, index) => {
            if (item === '全部') {
              value.splice(index, 1)
              result = value
            }
          })
        } else if (judgePreview && !judgeCurrent) { // 上一条存在全部，当前不存在全部
          result = []
        } else if (!judgePreview && judgeCurrent) { // 上一条不存在全部，当前存在全部
          result = totalData
        } else if (!judgePreview && !judgeCurrent) { // 都不存在全部
          if (value.length > remoteData.length - 1) {
            result = totalData
          } else {
            result = value
          }
        } else {
          return false
        }
      } else { // 上条数据是空的
        if (judgeCurrent) {
          result = totalData
        } else {
          result = value
        }
      }
    } else {
      result = []
    }

    return result
  }
}
