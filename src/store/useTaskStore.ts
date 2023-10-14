import { create } from 'zustand'
import { Task } from '../types'

interface TaskState {
  tasks: Task[]
  activeTask: Task | null
  isLoadingTasks: boolean
  isSavingTask: boolean
  loadTasks: (tasks: Task[]) => void
  setIsLoadingTasks: (isLoadingTasks: boolean) => void
  setIsSavingTask: (isSavingTask: boolean) => void
  clearActiveTask: () => void
  setActiveTask: (task: Task) => void
}

export const useTaskStore = create<TaskState>()((set) => ({
   tasks: [],
   activeTask: null,
   isLoadingTasks: false,
   isSavingTask: false,
   loadTasks: (tasks: Task[]) => set((state) => ({ tasks: tasks })),
   setIsSavingTask: (isSavingTask: boolean) => set((state) => ({ isSavingTask: isSavingTask })),
   setIsLoadingTasks: (isLoadingTasks: boolean) => set((state) => ({ isLoadingTasks: isLoadingTasks })),
   setActiveTask: (task: Task) => set((state) => {
      if (state.activeTask?.id === task.id) return state
      return { activeTask: task }
   }),
   clearActiveTask: () => set((state) => ({ activeTask: null}))
}))

