import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'
import HomePage from '@/pages/HomePage.vue'
import api from '@/plugins/axios'

vi.mock('@/plugins/axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

vi.mock('@/components/TrainingList.vue', () => ({
  default: {
    name: 'TrainingList',
    props: {
      trainings: Array,
    },
    emits: ['trainingClick'],
    template:
      '<div data-test="training-list"><button @click="$emit(\'trainingClick\', \'123\')" data-test="training-click">Click Training</button></div>',
  },
}))

vi.mock('@/components/DietList.vue', () => ({
  default: {
    name: 'DietList',
    props: {
      diets: Array,
    },
    emits: ['dietClick'],
    template:
      '<div data-test="diet-list"><button @click="$emit(\'dietClick\', \'456\')" data-test="diet-click">Click Diet</button></div>',
  },
}))

vi.mock('@/components/CoachList.vue', () => ({
  default: {
    name: 'CoachList',
    props: {
      coaches: Array,
    },
    template:
      '<div data-test="coach-list" v-if="coaches && coaches.length">Coach List with {{ coaches.length }} coaches</div>',
  },
}))

vi.mock('@/components/CoachCard.vue', () => ({
  default: {
    name: 'CoachCard',
    props: {
      id: [String, Number],
      name: String,
      description: String,
      picture: String,
      sex: String,
      age: Number,
      contact: Object,
      pricing: Object,
      legacy: String,
      backgroundPicture: String,
    },
    template: '<div data-test="coach-card">{{ name }} - {{ description }}</div>',
  },
}))

vi.mock('@/components/DailyCheckupFab.vue', () => ({
  default: {
    name: 'DailyCheckupFab',
    emits: ['open-modal'],
    template: '<div data-test="daily-checkup-fab"></div>',
  },
}))

vi.mock('@/components/DailyCheckupModal.vue', () => ({
  default: {
    name: 'DailyCheckupModal',
    props: ['modelValue'],
    emits: ['checkup-created', 'update:modelValue'],
    template: '<div data-test="daily-checkup-modal" v-if="modelValue"></div>',
  },
}))

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('HomePage', () => {
  const vuetify = createVuetify()
  let wrapper
  let consoleErrorSpy

  beforeEach(() => {
    vi.useFakeTimers()

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.clearAllMocks()
    mockPush.mockClear()

    api.get.mockImplementation((url) => {
      if (url === '/trainings/mine') {
        return Promise.resolve({ data: [{ id: '1', title: 'Training 1' }] })
      } else if (url === '/diets/mine') {
        return Promise.resolve({ data: [{ id: '1', name: 'Diet 1' }] })
      } else if (url === '/groups/coachs/mine') {
        return Promise.resolve({
          data: [{ id: '1', name: 'My Coach', description: 'My coach description' }],
        })
      } else if (url === '/profiles/coachs') {
        return Promise.resolve({
          data: [{ id: '1', name: 'Coach 1', description: 'Description 1' }],
        })
      }
      return Promise.reject(new Error('Not found'))
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    vi.useRealTimers()
    consoleErrorSpy.mockRestore()
  })

  it('displays user specific content when authenticated', async () => {
    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    expect(wrapper.text()).toContain('Bienvenue Test User')
    expect(wrapper.find('[data-test="training-list"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="diet-list"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="coach-list"]').exists()).toBe(true)

    expect(api.get).toHaveBeenCalledWith('/trainings/mine')
    expect(api.get).toHaveBeenCalledWith('/diets/mine')
    expect(api.get).toHaveBeenCalledWith('/groups/coachs/mine')
  })

  it('displays public content when not authenticated', async () => {
    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: null,
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    expect(wrapper.text()).toContain('Nos Coachs')
    expect(wrapper.text()).toContain('Bienvenue sur TrackTrain')
    expect(wrapper.find('[data-test="coach-card"]').exists()).toBe(true)

    expect(api.get).toHaveBeenCalledWith('/profiles/coachs')
  })

  it('navigates to training detail when training is clicked', async () => {
    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    const trainingButton = wrapper.find('[data-test="training-click"]')
    await trainingButton.trigger('click')
    await nextTick()

    expect(mockPush).toHaveBeenCalledWith('/training/123')
  })

  it('navigates to diet detail when diet is clicked', async () => {
    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    const dietButton = wrapper.find('[data-test="diet-click"]')
    await dietButton.trigger('click')
    await nextTick()

    expect(mockPush).toHaveBeenCalledWith('/diet/456')
  })

  it('handles API errors gracefully', async () => {
    api.get.mockRejectedValue(new Error('API Error'))

    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    expect(consoleErrorSpy).toHaveBeenCalled()
  })

  it('passes correct data to components when authenticated', async () => {
    const mockTrainings = [
      { id: '1', title: 'Training 1' },
      { id: '2', title: 'Training 2' },
    ]
    const mockDiets = [
      { id: '1', name: 'Diet 1' },
      { id: '2', name: 'Diet 2' },
    ]
    const mockCoaches = [{ id: '1', name: 'Coach 1', description: 'Description 1' }]

    api.get.mockImplementation((url) => {
      if (url === '/trainings/mine') {
        return Promise.resolve({ data: mockTrainings })
      } else if (url === '/diets/mine') {
        return Promise.resolve({ data: mockDiets })
      } else if (url === '/groups/coachs/mine') {
        return Promise.resolve({ data: mockCoaches })
      }
      return Promise.reject(new Error('Not found'))
    })

    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    const trainingList = wrapper.findComponent({ name: 'TrainingList' })
    const dietList = wrapper.findComponent({ name: 'DietList' })
    const coachList = wrapper.findComponent({ name: 'CoachList' })

    expect(trainingList.props('trainings')).toEqual(mockTrainings)
    expect(dietList.props('diets')).toEqual(mockDiets)
    expect(coachList.props('coaches')).toEqual(mockCoaches)
  })

  it('passes correct data to coach cards when not authenticated', async () => {
    const mockCoaches = [
      { id: '1', name: 'Coach 1', description: 'Description 1' },
      { id: '2', name: 'Coach 2', description: 'Description 2' },
    ]

    api.get.mockImplementation((url) => {
      if (url === '/profiles/coachs') {
        return Promise.resolve({ data: mockCoaches })
      }
      return Promise.reject(new Error('Not found'))
    })

    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: null,
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    const coachCards = wrapper.findAllComponents({ name: 'CoachCard' })
    expect(coachCards.length).toBeGreaterThan(0)
  })

  it('handles user without coaches correctly', async () => {
    api.get.mockImplementation((url) => {
      if (url === '/trainings/mine') {
        return Promise.resolve({ data: [] })
      } else if (url === '/diets/mine') {
        return Promise.resolve({ data: [] })
      } else if (url === '/groups/coachs/mine') {
        return Promise.resolve({ data: [] })
      }
      return Promise.reject(new Error('Not found'))
    })

    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    expect(wrapper.find('[data-test="coach-list"]').exists()).toBe(false)
  })

  it('handles training click event from TrainingList component', async () => {
    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    const trainingList = wrapper.findComponent({ name: 'TrainingList' })
    await trainingList.vm.$emit('trainingClick', '999')
    await nextTick()

    expect(mockPush).toHaveBeenCalledWith('/training/999')
  })

  it('handles diet click event from DietList component', async () => {
    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    const dietList = wrapper.findComponent({ name: 'DietList' })
    await dietList.vm.$emit('dietClick', '888')
    await nextTick()

    expect(mockPush).toHaveBeenCalledWith('/diet/888')
  })

  it('displays daily checkup components when authenticated', async () => {
    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: { id: '1', name: 'Test User' },
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    expect(wrapper.find('[data-test="daily-checkup-fab"]').exists()).toBe(true)
  })

  it('handles pagination correctly', async () => {
    const manyCoaches = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Coach ${i + 1}`,
      description: `Description ${i + 1}`,
    }))

    api.get.mockImplementation((url) => {
      if (url === '/profiles/coachs') {
        return Promise.resolve({ data: manyCoaches })
      }
      return Promise.reject(new Error('Not found'))
    })

    wrapper = mount(HomePage, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: null,
              },
              dailyCheckup: {
                fetchDailyCheckups: vi.fn(),
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
        },
      },
    })

    await nextTick()
    await vi.runAllTimersAsync()
    await nextTick()

    // Should show pagination when there are more than 6 coaches
    expect(wrapper.find('.pagination').exists()).toBe(true)
    expect(wrapper.text()).toContain('1 / 2')
  })
})
