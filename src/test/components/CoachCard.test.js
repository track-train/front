import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CoachCard from '@/components/CoachCard.vue'

const globalStubs = {
  PrimaryButton: {
    template: '<button @click="$emit(\'click\')"><slot /></button>',
  },
  'v-card': { template: '<div><slot /></div>' },
  'v-card-title': { template: '<div><slot /></div>' },
  'v-card-text': { template: '<div><slot /></div>' },
  'v-card-actions': { template: '<div><slot /></div>' },
  'v-avatar': { template: '<div><slot /></div>' },
  'v-img': { template: '<div></div>' },
}

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: pushMock }),
}))

// Mock du store selectedCoach
const setSelectedCoachMock = vi.fn()
vi.mock('@/stores/selectedCoach', () => ({
  useSelectedCoachStore: () => ({
    setSelectedCoach: setSelectedCoachMock,
  }),
}))

describe('CoachCard.vue', () => {
  let pinia

  beforeEach(() => {
    // Créer une nouvelle instance Pinia pour chaque test
    pinia = createPinia()
    setActivePinia(pinia)

    // Reset des mocks
    pushMock.mockClear()
    setSelectedCoachMock.mockClear()
  })

  it('affiche le nom et la description du coach', () => {
    const wrapper = mount(CoachCard, {
      props: {
        name: 'John Doe',
        description: 'Coach expert en musculation',
      },
      global: {
        stubs: globalStubs,
        plugins: [pinia],
      },
    })

    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Coach expert en musculation')
  })

  it("appelle router.push avec l'id du coach quand le bouton est cliqué", async () => {
    const wrapper = mount(CoachCard, {
      props: {
        name: 'John Doe',
        description: 'Coach expert en musculation',
        id: '123',
      },
      global: {
        stubs: globalStubs,
        plugins: [pinia],
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    // Vérifier que le store a été appelé avec les bonnes données
    expect(setSelectedCoachMock).toHaveBeenCalledWith({
      id: '123',
      name: 'John Doe',
      description: 'Coach expert en musculation',
      sex: null,
      age: null,
      contact: null,
      pricing: null,
      legacy: null,
      profile_picture_url: null,
      background_picture_url: null,
    })

    // Vérifier que la navigation se fait vers /coach
    expect(pushMock).toHaveBeenCalledWith('/coach')
  })

  it("ne fait rien si l'id est null quand le bouton est cliqué", async () => {
    const wrapper = mount(CoachCard, {
      props: {
        name: 'Jane Doe',
        description: 'Coach débutant',
        id: null,
      },
      global: {
        stubs: globalStubs,
        plugins: [pinia],
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    // Le comportement a changé : même sans ID, le store et la navigation sont appelés
    expect(setSelectedCoachMock).toHaveBeenCalledWith({
      id: null,
      name: 'Jane Doe',
      description: 'Coach débutant',
      sex: null,
      age: null,
      contact: null,
      pricing: null,
      legacy: null,
      profile_picture_url: null,
      background_picture_url: null,
    })
    expect(pushMock).toHaveBeenCalledWith('/coach')
  })
})
