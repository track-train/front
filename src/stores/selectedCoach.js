import { defineStore } from 'pinia'

export const useSelectedCoachStore = defineStore('selectedCoach', {
  state: () => ({
    coach: null,
  }),

  getters: {
    hasSelectedCoach: (state) => state.coach !== null,
    getCoach: (state) => state.coach,
  },

  actions: {
    setSelectedCoach(coachData) {
      this.coach = coachData
    },

    clearSelectedCoach() {
      this.coach = null
    },
  },
})
