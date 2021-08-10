import { mount, createLocalVue } from '@vue/test-utils'
import TableBase from '@/components/table/TableBase.vue'
import TableToolbar from '@/components/table/TableToolbar'
import VueRouter from 'vue-router'
// mount the router to the local vue instance
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('TableHeader.vue', () => {
  // title is rendered
  it('renders title when props.name passed', () => {
    const name = 'My Table'
    const wrapper = mount(TableBase, {
      propsData: { name }
    })
    expect(wrapper.text()).toMatch('My Table')
  })
})
describe('TableBase.vue', () => {
  it(
    'renders TableToolbar.vue component html which is a selector when props.perPage is passed and it shows correct value',
    async () => {
      const tableProps = {
        perPage: 5,
        fields: [
          {"key":"id","label":"ID","sortable":true},
          {"key":"first_name","label":"Name","sortable":true},
          {"key":"year","label":"Year","sortable":true},
          {"key":"color","label":"Color"},
          {"key":"created_at","label":"Created At"}
        ],
        items: [
          {
            "id": 1,
            "email": "george.bluth@reqres.in",
            "first_name": "George",
            "last_name": "Bluth",
            "avatar": "https://reqres.in/img/faces/1-image.jpg"
          },
          {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
          },
          {
            "id": 3,
            "email": "emma.wong@reqres.in",
            "first_name": "Emma",
            "last_name": "Wong",
            "avatar": "https://reqres.in/img/faces/3-image.jpg"
          },
          {
            "id": 4,
            "email": "eve.holt@reqres.in",
            "first_name": "Eve",
            "last_name": "Holt",
            "avatar": "https://reqres.in/img/faces/4-image.jpg"
          },
          {
            "id": 5,
            "email": "charles.morris@reqres.in",
            "first_name": "Charles",
            "last_name": "Morris",
            "avatar": "https://reqres.in/img/faces/5-image.jpg"
          },
          {
            "id": 6,
            "email": "tracey.ramos@reqres.in",
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://reqres.in/img/faces/6-image.jpg"
          },
          {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
          },
          {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
          },
          {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
          },
          {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://reqres.in/img/faces/10-image.jpg"
          },
          {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://reqres.in/img/faces/11-image.jpg"
          },
          {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://reqres.in/img/faces/12-image.jpg"
          }
        ],
        totalPages: 3,
        currentPage: 1,
        name: 'Users'
      }
      /**
       * WARNING
       * setProps should be called only for top-level component, mounted by mount or shallowMount
       */
      const wrapper = mount(TableToolbar, {
        propsData: tableProps,
        localVue,
        router
      })
      /**
       * Contains all the correct html <option> elements to be rendered
       */
      expect(wrapper.find('select').contains('.per-page-5')).toBe(true)
      expect(wrapper.find('select').contains('.per-page-10')).toBe(true)
      expect(wrapper.find('select').contains('.per-page-15')).toBe(true)
      expect(wrapper.find('select').text()).toContain('10') // currently selected prop: 10 (see tablePops passed to propsData)
  })
})
describe('TableBase.vue', () => {
  it('renders 10 table rows when passed a props.items array with 10 objects and props.perPage set to 10', () => {
    const wrapper = mount(TableBase, {
      propsData: {
        perPage: 10,
        items: [
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
          { a: 1, b: 2, c: 3},
        ],
        fields: [
          { key: 'a', label: 'Field 1' },
          { key: 'b', label: 'Field 2' },
          { key: 'c', label: 'Field 3' }
        ]
      }
    })
    // tr for header
    expect(wrapper.findAll('tr').length - 1).toBe(10)
  })
})
describe('TableToolbar.vue', () => {
  it('Emits event when propsData is chaged using setProps', async () => {
    const wrapper = mount(TableToolbar, {
      propsData: {
        perPage: 10
      }
    })
    expect(wrapper.find('option[data-selected=true]').text()).toBe('--- 10 ---')
    await wrapper.setData({ limit: 15 })
    expect(wrapper.find('option[data-selected=true]').text()).toBe('--- 15 ---')
    await wrapper.setData({ limit: 5 })
    expect(wrapper.find('option[data-selected=true]').text()).toBe('--- 5 ---')
  })
})