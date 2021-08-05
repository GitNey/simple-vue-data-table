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
    expect(wrapper.text()).toMatch('My Table')
  })

  it('renders pagination option when props.perPage passed', () => {
    const wrapper = mount(TableBase, {
      propsData: {
        perPage: 10
      }
    })
    expect(wrapper.find('select').contains('.per-page-10')).toBe(true)
    expect(wrapper.find('select').text()).toContain('10')
  })

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
