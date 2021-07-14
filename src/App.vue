<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-12">
        <Table
          :name="`${resource} table`"
          :items="items"
          :fields="fields"
          :totalPages="totalPages"
          :currentPage="page"
          :per-page="perPage"
          @page-changed="pageChanged"
          @sort-items="sort"
          @limit-changed="limitChanged"
        />
      </div>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Table from '@/components/table/TableBase'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    Table
  },
  data () {
    return {
      items: [],
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'first_name', label: 'Name' },
        { key: 'year', label: 'Year', sortable: true },
        { key: 'color', label: 'Color' },
        { key: 'created_at', label: 'Created At' }
      ],
      totalPages: null,
      resource: 'post',
      page: 1
    }
  },
  methods: {
    fetchData (resource = 'posts', page = 1, perPage = 10) {
      return fetch(`https://reqres.in/api/${resource}?page=${page}&per_page=${perPage}`)
        .then((response) => {
          return response.json()
        })        
    },
    async refreshTable (resource, page, perPage) {
      try {
        let res = await this.fetchData(resource, page, perPage)
        this.items = res.data
        this.totalPages = res.total_pages
        this.page = res.page
      } catch (e) {
        window.console.log(e)
      }
    },
    pageChanged (page) {
      this.refreshTable(this.resource, page, this.perPage)
    },
    sort (items) {
      this.items = items
    },
    limitChanged (limit) {
      this.page = 1
      this.perPage = limit
      this.refreshTable(this.resource, this.page, limit)
    }
  },
  async mounted () {
    this.refreshTable(this.resource, this.page, this.perPage)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
