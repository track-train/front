import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDietStore } from '@/stores/diet'
import api from '@/plugins/axios'

vi.mock('@/plugins/axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Diet Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDietStore()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Getters', () => {
    it('totalMacroPlans returns correct count', () => {
      store.macroPlans = [
        { id: 'mp1', name: 'High Protein' },
        { id: 'mp2', name: 'Low Carb' },
      ]
      expect(store.totalMacroPlans).toBe(2)
    })

    it('totalMealPlans returns correct count', () => {
      store.mealPlans = [
        { id: 'ml1', name: 'Breakfast Plan' },
        { id: 'ml2', name: 'Dinner Plan' },
      ]
      expect(store.totalMealPlans).toBe(2)
    })

    it('totalMealsCount returns sum of all meals', () => {
      store.mealPlans = [
        { id: '1', meals: [{ id: 'm1' }, { id: 'm2' }] },
        { id: '2', meals: [{ id: 'm3' }] },
        { id: '3', meals: [] },
      ]
      expect(store.totalMealsCount).toBe(3)
    })

    it('totalMealsCount returns 0 when no meal plans', () => {
      store.mealPlans = []
      expect(store.totalMealsCount).toBe(0)
    })

    it('averageMealsPerPlan returns 0 with empty plans', () => {
      store.mealPlans = []
      expect(store.averageMealsPerPlan).toBe(0)
    })

    it('highestCaloriePlan returns plan with highest kilocalorie', () => {
      store.macroPlans = [
        { id: 'mp1', name: 'Low Cal', kilocalorie: 1200 },
        { id: 'mp2', name: 'High Cal', kilocalorie: 2000 },
        { id: 'mp3', name: 'Medium Cal', kilocalorie: 1500 },
      ]
      expect(store.highestCaloriePlan).toEqual({
        id: 'mp2',
        name: 'High Cal',
        kilocalorie: 2000,
      })
    })

    it('highestCaloriePlan returns null when no macro plans', () => {
      store.macroPlans = []
      expect(store.highestCaloriePlan).toBe(null)
    })

    it('highestCaloriePlan handles plans without kilocalorie', () => {
      store.macroPlans = [
        { id: 'mp1', name: 'Plan 1' },
        { id: 'mp2', name: 'Plan 2', kilocalorie: 1500 },
      ]
      expect(store.highestCaloriePlan).toEqual({
        id: 'mp2',
        name: 'Plan 2',
        kilocalorie: 1500,
      })
    })

    it('lowestCaloriePlan returns plan with lowest kilocalorie', () => {
      store.macroPlans = [
        { id: 'mp1', name: 'Low Cal', kilocalorie: 1200 },
        { id: 'mp2', name: 'High Cal', kilocalorie: 2000 },
        { id: 'mp3', name: 'Medium Cal', kilocalorie: 1500 },
      ]
      expect(store.lowestCaloriePlan).toEqual({
        id: 'mp1',
        name: 'Low Cal',
        kilocalorie: 1200,
      })
    })

    it('lowestCaloriePlan returns null when no macro plans', () => {
      store.macroPlans = []
      expect(store.lowestCaloriePlan).toBe(null)
    })
  })

  describe('Actions', () => {
    describe('fetchDiet', () => {
      it('fetches diet successfully and updates state', async () => {
        const dietData = { id: 'diet1', name: 'Keto Diet', description: 'Low carb diet' }
        api.get.mockResolvedValueOnce({ data: dietData })

        const result = await store.fetchDiet('diet1')

        expect(api.get).toHaveBeenCalledWith('/diets/diet1')
        expect(store.currentDiet).toEqual(dietData)
        expect(result).toEqual(dietData)
        expect(store.loading.diet).toBe(false)
        expect(store.error).toBe(null)
      })

      it('handles API errors correctly', async () => {
        const error = new Error('Network error')
        api.get.mockRejectedValueOnce(error)

        await expect(store.fetchDiet('diet1')).rejects.toThrow('Network error')

        expect(store.error).toBe('Erreur lors du chargement de la diet')
        expect(store.loading.diet).toBe(false)
        expect(store.currentDiet).toBe(null)
      })

      it('sets loading state correctly during fetch', async () => {
        let resolvePromise
        const promise = new Promise((resolve) => {
          resolvePromise = resolve
        })
        api.get.mockReturnValueOnce(promise)

        const fetchPromise = store.fetchDiet('diet1')
        expect(store.loading.diet).toBe(true)

        resolvePromise({ data: { id: 'diet1' } })
        await fetchPromise
        expect(store.loading.diet).toBe(false)
      })
    })

    describe('fetchMacroPlans', () => {
      it('fetches macro plans successfully', async () => {
        const macroPlansData = [
          { id: 'mp1', name: 'High Protein', kilocalorie: 2000 },
          { id: 'mp2', name: 'Low Carb', kilocalorie: 1500 },
        ]
        api.get.mockResolvedValueOnce({ data: macroPlansData })

        const result = await store.fetchMacroPlans('diet1', 'user123')

        expect(api.get).toHaveBeenCalledWith('/diets/diet1/user/user123/macro_plans')
        expect(store.macroPlans).toEqual(macroPlansData)
        expect(result).toEqual(macroPlansData)
        expect(store.loading.macroPlans).toBe(false)
        expect(store.error).toBe(null)
      })

      it('throws error when no targetUserId provided', async () => {
        await expect(store.fetchMacroPlans('diet1')).rejects.toThrow('Utilisateur cible non trouvé')

        expect(store.error).toBe('Utilisateur cible non trouvé')
        expect(store.loading.macroPlans).toBe(false)
        expect(api.get).not.toHaveBeenCalled()
      })

      it('throws error when targetUserId is null', async () => {
        await expect(store.fetchMacroPlans('diet1', null)).rejects.toThrow(
          'Utilisateur cible non trouvé',
        )

        expect(store.error).toBe('Utilisateur cible non trouvé')
        expect(store.loading.macroPlans).toBe(false)
      })

      it('handles API errors correctly', async () => {
        const error = new Error('Server error')
        api.get.mockRejectedValueOnce(error)

        await expect(store.fetchMacroPlans('diet1', 'user123')).rejects.toThrow('Server error')

        expect(store.error).toBe('Erreur lors du chargement des macro plans')
        expect(store.macroPlans).toEqual([])
        expect(store.loading.macroPlans).toBe(false)
      })
    })

    describe('fetchMealPlans', () => {
      it('fetches meal plans successfully', async () => {
        const mealPlansData = [
          { id: 'ml1', name: 'Breakfast Plan', meals: [{ id: 'm1' }] },
          { id: 'ml2', name: 'Dinner Plan', meals: [{ id: 'm2' }, { id: 'm3' }] },
        ]
        api.get.mockResolvedValueOnce({ data: mealPlansData })

        const result = await store.fetchMealPlans('diet1', 'user123')

        expect(api.get).toHaveBeenCalledWith('/diets/diet1/user/user123/meal_plans')
        expect(store.mealPlans).toEqual(mealPlansData)
        expect(result).toEqual(mealPlansData)
        expect(store.loading.mealPlans).toBe(false)
        expect(store.error).toBe(null)
      })

      it('throws error when no targetUserId provided', async () => {
        await expect(store.fetchMealPlans('diet1')).rejects.toThrow('Utilisateur cible non trouvé')

        expect(store.error).toBe('Utilisateur cible non trouvé')
        expect(store.loading.mealPlans).toBe(false)
        expect(api.get).not.toHaveBeenCalled()
      })

      it('throws error when targetUserId is empty string', async () => {
        await expect(store.fetchMealPlans('diet1', '')).rejects.toThrow(
          'Utilisateur cible non trouvé',
        )

        expect(store.error).toBe('Utilisateur cible non trouvé')
        expect(store.loading.mealPlans).toBe(false)
      })

      it('handles API errors correctly', async () => {
        const error = new Error('Network error')
        api.get.mockRejectedValueOnce(error)

        await expect(store.fetchMealPlans('diet1', 'user123')).rejects.toThrow('Network error')

        expect(store.error).toBe('Erreur lors du chargement des meal plans')
        expect(store.mealPlans).toEqual([])
        expect(store.loading.mealPlans).toBe(false)
      })

      it('sets loading state correctly during fetch', async () => {
        let resolvePromise
        const promise = new Promise((resolve) => {
          resolvePromise = resolve
        })
        api.get.mockReturnValueOnce(promise)

        const fetchPromise = store.fetchMealPlans('diet1', 'user123')
        expect(store.loading.mealPlans).toBe(true)

        resolvePromise({ data: [] })
        await fetchPromise
        expect(store.loading.mealPlans).toBe(false)
      })
    })

    describe('resetStore', () => {
      it('resets all store data to initial state', () => {
        // Populate store with data
        store.currentDiet = { id: 'diet1', name: 'Test Diet' }
        store.macroPlans = [{ id: 'mp1', name: 'Plan 1' }]
        store.mealPlans = [{ id: 'ml1', name: 'Meal Plan 1' }]
        store.error = 'Some error message'
        store.loading.diet = true
        store.loading.macroPlans = true
        store.loading.mealPlans = true

        store.resetStore()

        expect(store.currentDiet).toBe(null)
        expect(store.macroPlans).toEqual([])
        expect(store.mealPlans).toEqual([])
        expect(store.error).toBe(null)
        // Note: resetStore ne remet pas à zéro les états de loading
        // si c'est souhaité, il faudra l'ajouter au store
      })

      it('can be called multiple times safely', () => {
        store.resetStore()
        store.resetStore()

        expect(store.currentDiet).toBe(null)
        expect(store.macroPlans).toEqual([])
        expect(store.mealPlans).toEqual([])
        expect(store.error).toBe(null)
      })
    })
  })

  describe('State initialization', () => {
    it('has correct initial state', () => {
      const freshStore = useDietStore()

      expect(freshStore.currentDiet).toBe(null)
      expect(freshStore.macroPlans).toEqual([])
      expect(freshStore.mealPlans).toEqual([])
      expect(freshStore.error).toBe(null)
      expect(freshStore.loading).toEqual({
        diet: false,
        macroPlans: false,
        mealPlans: false,
      })
    })
  })
})
