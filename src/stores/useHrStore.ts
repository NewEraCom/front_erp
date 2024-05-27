import { defineStore } from 'pinia'

export const useHrStore = defineStore('HrStore', {
  state: () => ({
    employees: null,
    selectedEmployee: null
  }),
  actions: {
    setEmployees(data: any) {
      this.employees = data
    },
    clearEmployees() {
      this.employees = null
    },
    setSelectedEmployee(employee: any) {
      this.selectedEmployee = employee
      localStorage.setItem('selectedEmployee', JSON.stringify(employee))
    },
    clearSelectedEmployee() {
      this.selectedEmployee = null
      localStorage.removeItem('selectedEmployee')
    }
  },
  getters: {
    getEmployees: (state) => state.employees
  }
})
