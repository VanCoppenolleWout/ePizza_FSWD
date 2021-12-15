import { shallowMount, mount } from '@vue/test-utils'
import RegisterComponent from '@/components/RegisterComponent.vue'

describe('RegisterComponent.vue', () => {
  it('Show error on input field', async () => {
    const wrapper = mount(RegisterComponent, {})

    await wrapper.find('#email').setValue('')
    expect(wrapper.find('.input-error').text()).toMatch('This field is required')
  })

  it('Show error when submitting empty form', async () => {
    const wrapper = mount(RegisterComponent, {})

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.error').text()).toMatch('Please fill in all fields')
  })

  it('Show error when passwords do not match', async () => {
    const wrapper = mount(RegisterComponent, {})

    await wrapper.find('#email').setValue('name@mail.com')
    await wrapper.find('#name').setValue('name')
    await wrapper.find('#lastname').setValue('lastname')
    await wrapper.find('#phone_nr').setValue('0496054389')
    await wrapper.find('#password').setValue('password')
    await wrapper.find('#confirm').setValue('confirm')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.error').text()).toMatch(
      'Password values do not match',
    )
  })
})
