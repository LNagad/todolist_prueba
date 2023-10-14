import { create } from 'zustand'
import { Task } from '../types'

interface TaskState {
  activeTask: Task | null
  setActiveTask: (task: Task) => void
  clearActiveTask: () => void
}

export const useTaskStore = create<TaskState>()((set) => ({
   activeTask: null,
   setActiveTask: (task) => set((state) => ({ activeTask: task })),
   clearActiveTask: () => set((state) => ({ activeTask: null}))
}))