import { create } from 'zustand'
import { Task } from '../types'

interface TaskState {
  tasks: Task[]
  activeTask: Task | null
  isLoadingTasks: boolean
  isSavingTask: boolean
  showEditModal: boolean
  editModalTask: Task | null
  loadTasks: (tasks: Task[]) => void
  setEditModalTask: (task: Task) => void
  setShowEditModal: (showModal: boolean) => void
  setIsLoadingTasks: (isLoadingTasks: boolean) => void
  setIsSavingTask: (isSavingTask: boolean) => void
  clearActiveTask: () => void
  setActiveTask: (task: Task) => void
}

export const useTaskStore = create<TaskState>()((set, get) => ({
   tasks: [],
   editModalTask: null,
   activeTask: null,
   isLoadingTasks: false,
   isSavingTask: false,
   showEditModal: false,
   setShowEditModal: (showModal: boolean) => set((state) => ({ showEditModal: showModal })),
   setEditModalTask: (task: Task) => set((state) => ({ editModalTask: task })),
   loadTasks: (tasks: Task[]) => set((state) => ({ tasks: tasks })),
   setIsSavingTask: (isSavingTask: boolean) => set((state) => ({ isSavingTask: isSavingTask })),
   setIsLoadingTasks: (isLoadingTasks: boolean) => set((state) => ({ isLoadingTasks: isLoadingTasks })),
   setActiveTask: (task: Task) => set((state) => {
      if (state.activeTask?.id === task.id) return state
      return { activeTask: task }
   }),
   clearActiveTask: () => set((state) => ({ activeTask: null}))
}))

