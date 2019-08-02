<template>
  <!-- 接口日志 -->
  <div class="base-wrap">
    <port-log
      :formData="formData"
      :columns="tableColumns"
      :tableData="tableData"
      :tableLoading="loading"
      :iconData="iconData"
      :stateDisabled="stateDisabled"
      :pageSizes="pageSizes"
      :currentNumber="currentNumber"
      :total="total"
      :dialogDataInfo="dialogDataInfo"
      :dialogDataAbnormal="dialogDataAbnormal"
      @handleSubmit="handleSubmit"
      @handleReset="handleReset"
      @handleDetail="handleDetailRow"
      @handleAbnormal="handleAbnormalRow"
      @handleResend="handleResendRow"
      @handleSizeChange="handleSizeChange"
      @handleCurrentPageChange="handleCurrentPageChange">

      <!-- 检索部分 -->
      <template slot="filter">
        <el-input
          v-model="formData.name"
          @keyup.enter.native="handleSubmit"
          placeholder="请输入接口编号/接口名称">
        </el-input>
      </template>

      <!-- 高级搜索部分 -->
      <template slot="advanced-search">
        <el-form size="mini" :inline="true" v-model="searchData" label-width="82px">
          <el-form-item label="数据状态" class="base-form-checkbox">
            <el-checkbox-group v-model="searchData.status">
              <el-checkbox label="0">全部</el-checkbox>
              <el-checkbox label="1">失败</el-checkbox>
              <el-checkbox label="2">成功</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="关键字" class="base-form-input">
            <el-input
              v-model="searchData.keyword"
              placeholder="接口请求报文关键字"
              :clearable="true">
            </el-input>
          </el-form-item>
          <el-form-item label="数据日期" class="base-form-date">
            <el-date-picker
              v-model="searchData.startDate"
              type="date"
              placeholder="请选择开始日期"
              :editable="false"
              :clearable="false"
              :picker-options="pickerStartDate"></el-date-picker>
            <span class="popover-span">~</span>
            <el-date-picker
              v-model="searchData.endDate"
              type="date"
              placeholder="请选择结束日期"
              :editable="false"
              :clearable="false"
              :picker-options="pickerEndDate"></el-date-picker>
          </el-form-item>
        </el-form>
      </template>

    </port-log>
  </div>
</template>

<script>
    import portLog from '../components/portLog/src/PortLog.vue'
    export default {
      data () {
        return {

          /*********************************** 表格部分 ***********************************/

          // 表格配置
          tableColumns: [
            {
              label: '接口',
              prop: 'businessType',
              minWidth: '160px'
            },
            {
              label: '系统名称',
              prop: 'product',
              minWidth: '160px'
            },
            {
              label: '功能模块',
              prop: 'module',
              minWidth: '160px'
            },
            {
              label: '数据接收方',
              prop: 'requestTo',
              minWidth: '160px'
            },
            {
              label: '状态',
              prop: 'status',
              minWidth: '160px',
              sortable: true
              // formatter: (row) => {
              //   return row.status ? '成功' : '失败'
              // }
            }
          ],
          tableData: [],      // 表格数据
          loading: false,     // 表格加载状态
          // 操作列字体图标
          iconData: {
            message: {
              flag: true,
              icon: 'icon-message'
            },
            abnormal: {
              flag: false,
              icon: 'icon-abnormal'
            },
            resend: {
              flag: true,
              icon: 'icon-resend'
            }
          },
          // 状态字段名
          stateDisabled: 'success',
          pageSizes: 10,      // 每页条数
          currentNumber: 1,   // 当前页码
          total: 0,           // 总条数

          /*********************************** 全局变量 ***********************************/

          sendData: [],       // 数据发送方数据集合
          receiveData: [],    // 数据接收方数据集合
          dataLoading: false, // 模糊搜索加载状态

          /*********************************** 搜索部分 ***********************************/

          formData: {
            name: ''
          },

          // 高级搜索框的数据集合
          searchData: {
            status: ['1'],      // 数据状态
            dataSend: '',       // 数据发送方
            dataReceive: '',    // 数据接收方
            keyword: '',        // 关键字
            startDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 6),    // 开始日期
            endDate: new Date() // 结束日期
          },

          /*********************************** 日期校验 ***********************************/

          pickerStartDate: {
            disabledDate: (time) => {
              let endDateVal = this.searchData.endDate
              if (endDateVal) {
                return time.getTime() > endDateVal
              } else {
                return time.getTime() > Date.now()
              }
            }
          },
          pickerEndDate: {
            disabledDate: (time) => {
              let startDateVal = this.searchData.startDate
              if (startDateVal) {
                return time.getTime() < startDateVal // || time.getTime() > Date.now()
              } else {
                // return time.getTime() > Date.now()
              }
            }
          },

          /*********************************** 对话框部分 ***********************************/

          dialogDataInfo: {},     // 报文部分
          dialogDataAbnormal: []  // 数据异常部分
        }
      },

      created () {
      },

      components: {
        portLog
      },

      mounted () {},

      methods: {

        // 提交查询方法
        handleSubmit: function () {
          this.loading = true
          // 开始日期
          let startDate = this.searchData.startDate
          if (this.searchData.startDate) {
            startDate = '2019-06-18'
            // startDate = this.formatDate.dateFtt(this.searchData.startDate, 'yyyy-MM-dd')
          } else {
            startDate = null
          }
          // 结束日期
          let endDate = this.searchData.endDate
          if (this.searchData.endDate) {
            endDate = '2019-06-18'
            // endDate = this.formatDate.dateFtt(this.searchData.endDate, 'yyyy-MM-dd')
          } else {
            endDate = null
          }
          // 请求查询接口
          this.ajax({
            type: 'get',
            url: 'http://172.16.0.218:8080/mock/21/test/postLog',
            data: {
              filter: this.formData.name,               // 接口编号/接口名称
              status: this.searchData.status,           // 数据状态
              dataSend: this.searchData.dataSend,       // 数据发送方
              dataReceive: this.searchData.dataReceive, // 数据接收方
              startDate: startDate,                     // 开始日期
              endDate: endDate,                         // 结束日期
              keyword: this.searchData.keyword,         // 关键字
              pageSize: this.pageSizes,                 // 每页记录数
              currentNumber: this.currentNumber         // 当前页码
            },
            success: response => {
              // // 判断返回的数据是否为空
              if (response.data.dataList.length < 1 && this.currentNumber !== 0) {
                this.currentNumber = 1
                this.handleSubmit()
              }
              this.tableData = response.data.dataList
              this.total = response.data.count
              this.loading = false
              // this.handleMaxHeight()
            }
          })
        },

        // 重置的方法
        handleReset: function () {
          this.searchData = {
            status: ['1'],      // 数据状态
            dataSend: '',       // 数据发送方
            dataReceive: '',    // 数据接收方
            startDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 6), // 开始日期
            endDate: new Date() // 结束日期
          }
        },

        // 报文的方法
        handleDetailRow: function (scope) {
          this.ajax({
            type: 'get',
            url: 'http://172.16.0.218:8080/mock/21/test/getReport',
            data: {
              id: scope.row.id
            },
            success: res => {
              this.dialogDataInfo = res.data
            }
          })
        },

        // 数据异常的方法
        handleAbnormalRow: function (scope) {
          this.ajax({
            type: 'get',
            url: 'http://172.16.0.218:8080/mock/21/test/getDataException',
            data: {
              id: scope.row.id
            },
            success: res => {
              this.dialogDataAbnormal = res.data
            }
          })
        },

        // 重新发送的方法
        handleResendRow: function (scope) {
          console.log(scope.row)
        },

        // 每页条数变化的方法
        handleSizeChange: function (pageSize) {
          this.pageSizes = pageSize
          this.handleSubmit()
        },

        // 当前页码变化的方法
        handleCurrentPageChange: function (currentNum) {
          this.currentNumber = currentNum
          this.handleSubmit()
        },

        /**
          *@ 原生异步请求的封装
          *@ options.url: 地址
          *@ options.type: 请求方式
          *@ options.async: 同步：false，异步：true
          *@ options.contentType: 数据格式
          *@ options.data: 参数
          *@ options.success: function (data) {}返回请求数据
        **/
        ajax: function (options) {
          var xhr = null
          var params = formsParams(options.data)

          // 创建对象
          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
          } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
          }

          // 请求的接口地址以及请求方式
          var type = options.type.toLowerCase()

          // 用于清除缓存
          var random = Math.random()

          // 请求方式
          if (!options.async) {
            options.async = true
          }
          if (type === 'get') {
            xhr.open(type, options.url + '?' + params + '&' + random, options.async)
            xhr.setRequestHeader('Content-type', options.contentType || 'application/json')
            xhr.send(null)
          } else if (type === 'post') {
            params = JSON.stringify(options.data)
            xhr.open(type, options.url, options.async)
            xhr.setRequestHeader('Content-type', options.contentType || 'application/x-www-form-urlencoded')
            xhr.send(params)
          }

          // 请求成功后的方法
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // console.log(xhr.responseText);
              options.success(JSON.parse(xhr.responseText))
            }
          }

          // 参数拼接
          function formsParams (data) {
            var arr = []
            for (var prop in data) {
              arr.push(prop + '=' + data[prop])
            }
            return arr.join('&')
          }
        }
      }
    }
</script>

<style>
  html, body {
    height: 100%;
    overflow: hidden;
  }

  body {
    background: #e3e9f3;
  }
  .base-wrap {
    color: #333;
    height: calc(100% - 20px);
    padding: 10px;
    background-color: #fff;
  }
</style>