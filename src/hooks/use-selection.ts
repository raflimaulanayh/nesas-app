/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'

type CheckboxSelectionStore = {
  selectedIds: string[]
  toggleSelectedId: (id: string) => void
}

export const useCheckboxSelection = create<CheckboxSelectionStore>((set) => ({
  selectedIds: [],
  toggleSelectedId: (id) =>
    set((state: { selectedIds: string[] }) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id]
    }))
}))
