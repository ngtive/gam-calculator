import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

const useCalculateStore = defineStore('calculate-store', () => {
  const state = reactive({
    applicants: [
      {
        name: '',
        counter: 1,
        due: 0,
        rate: 0,
        government: 0,
        transfer: 0,
        hold: 0,
        totalCredit: 0
      }
    ]
  })
  const committed = reactive({
    name: '',
    totalCredit: 0,
    rate: 36,
    creditType: 'gam'
  })


  const calculations = computed(() => {

    const applicantsCopy = [...state.applicants];
    if (applicantsCopy[0].government > 0)
      applicantsCopy[0].totalCredit = committed.totalCredit - applicantsCopy[0].government
    else
      applicantsCopy[0].totalCredit = committed.totalCredit


    for (let idx = 1; idx < applicantsCopy.length; idx++) {
      let prevCredit = applicantsCopy[idx - 1].totalCredit;

      if (applicantsCopy[idx]?.government > 0) {
        prevCredit =  prevCredit - (applicantsCopy[idx - 1].totalCredit * (applicantsCopy[idx - 1].rate / 100));
        applicantsCopy[idx].totalCredit = prevCredit * (applicantsCopy[idx - 1].transfer / 100)
        applicantsCopy[idx].totalCredit = applicantsCopy[idx].totalCredit - applicantsCopy[idx].government

      } else {
        prevCredit =  prevCredit - (applicantsCopy[idx - 1].totalCredit * (applicantsCopy[idx - 1].rate / 100));
        applicantsCopy[idx].totalCredit = prevCredit * (applicantsCopy[idx - 1].transfer / 100)
      }
    }


    return [...applicantsCopy].reverse()
  }, {onTrigger: () => {
      console.log('Calculation triggered')
    }})

  const addRawApplicant = () => {
    state.applicants.push({
      name: '',
      counter: state.applicants[state.applicants.length - 1].counter + 1,
      due: 0,
      rate: 0,
      government: 0,
      transfer: 0,
      hold: 0,
      totalCredit: 0
    })
  }


  return {
    addRawApplicant,
    calculations,
    state,
    committed
  }
})

export default useCalculateStore