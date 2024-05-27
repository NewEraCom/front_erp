const togglePassword = (value: string[]): string[] => {
  return value[0] === 'ti-eye' ? ['ti-eye-off', 'text'] : ['ti-eye', 'password']
}

const initialHomePage = (role: string) => {
  switch (role) {
    case 'Employee':
      return '/portal/dashboard'
    default:
      return '/login'
  }
}

const closeCanva = () => {
  const buttons = document.querySelectorAll('.close-button')
  buttons.forEach(function (button: any) {
    button.click()
  })
}

import SGM from '@/assets/img/brands/sgm.png'
import CIH from '@/assets/img/brands/cih.jpeg'
import Other from '@/assets/img/brands/other.png'
import Attijariwafa from '@/assets/img/brands/Attijariwafa.png'
import BMCI from '@/assets/img/brands/BMCI.png'
import BMCE from '@/assets/img/brands/BMCE.png'
import BANQUE_POPULAIRE from '@/assets/img/brands/Banque-populaire.png'
import AL_BARID_BANK from '@/assets/img/brands/AL-BARID-BANK.jpeg'
import CREDIT_AGRICOLE from '@/assets/img/brands/Credit Agricole.jpeg'
import CREDIT_DU_MAROC from '@/assets/img/brands/Credit du Maroc.png'
import CFG_BANK from '@/assets/img/brands/CFG BANK.svg'
import AL_AKHDAR_BANK from '@/assets/img/brands/AL-AKHDAR-BANK.png'
import UMNIA_BANK from '@/assets/img/brands/UMNIA_BANK.png'
import NoLogo from '@/assets/img/brands/NoLogo.png'

function bankName(bank: string) {
  switch (bank) {
    case 'BMCE BANK':
      return [BMCE, 'BMCE']
    case 'CIH':
      return [CIH, 'CIH Bank']
    case 'SOCIETE GENERALE':
      return [SGM, 'Société Générale']
    case 'BMCI':
      return [BMCI, 'BMCI Bank']
    case 'ATTIJARIWAFA BANK':
      return [Attijariwafa, 'Attijariwafa Bank']
    case 'BANQUE POPULAIRE':
      return [BANQUE_POPULAIRE, 'Banque Populaire']
    case 'Crédit du Maroc':
      return [CREDIT_DU_MAROC, 'Crédit du Maroc']
    case 'Crédit Agricole du Maroc':
      return [CREDIT_AGRICOLE, 'Crédit Agricole du Maroc']
    case 'AL BARID BANK':
      return [AL_BARID_BANK, 'Al Barid Bank']
    case 'CFG BANK':
      return [CFG_BANK, 'CFG Bank']
    case 'AL AKHDAR BANK':
      return [AL_AKHDAR_BANK, 'Al Akhdar Bank']
    case 'Umnia Bank':
      return [UMNIA_BANK, 'Umnia Bank']
    case 'Autre':
      return [Other, bank]
    default:
      return [NoLogo, bank]
  }
}

const checkIfEmpty = (value: string) => {
  if (value === null || value === undefined || value === '') {
    return null
  }
  return value
}

export const helpers = {
  togglePassword,
  initialHomePage,
  closeCanva,
  bankName,
  checkIfEmpty
}
