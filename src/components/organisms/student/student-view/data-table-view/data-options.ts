export interface OptionProps {
  label: string
  value: string
  checked?: boolean
  other?: string
}

export const GRADUATE_STATUS_OPTIONS = [
  {
    label: 'Proses',
    value: 'ongoing'
  },
  {
    label: 'Lulus',
    value: 'graduated'
  },
  {
    label: 'Dropout',
    value: 'dropout'
  },
  {
    label: 'Pindah',
    value: 'transferred'
  }
]

export const GENDER_OPTIONS = [
  {
    value: 'male',
    label: 'Laki-Laki'
  },
  {
    value: 'female',
    label: 'Perempuan'
  }
]
