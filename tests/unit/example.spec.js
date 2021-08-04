import { mount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
import TableBase from '@/components/table/TableBase.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('TableBase.vue', () => {
  it('renders title when props.name passed', () => {
    const name = 'My Table'
    const wrapper = mount(TableBase, {
      propsData: { name }
    })
    expect(wrapper.text()).toMatch(name)
  })

  it('renders pagination option when props.perPage passed', () => {
    // const perPage = 10
    const wrapper = mount(TableBase, {
      propsData: {
        perPage: 10,
        // items: [],
        // fields: [
        //   { key: 'id', label: 'ID', sortable: true },
        //   { key: 'first_name', label: 'Name', sortable: true },
        //   { key: 'year', label: 'Year', sortable: true },
        //   { key: 'color', label: 'Color' },
        //   { key: 'created_at', label: 'Created At' }
        // ],
        // totalPages: null,
        // resource: 'users',
        // page: 1
      }
    })
    expect(wrapper.find('select').contains('.per-page-10')).toBe(true)
  })
})
