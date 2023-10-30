import { create } from 'zustand'
import { api } from '../lib/axios'

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  play: (params: [number, number]) => void
  next: () => void
  load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    play: ([moduleIndex, lessonIndex]: [number, number]) => {
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1

      const nextLesson =
        course?.modules[currentLessonIndex]?.lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex
        })
        return
      }

      console.log('Você chegou ao final do curso')

      const nextModuleIndex = currentModuleIndex + 1
      const nextModule = course?.modules[nextModuleIndex]

      if (nextModule) {
        set({
          currentLessonIndex: 0,
          currentModuleIndex: nextModuleIndex
        })
      }
    },
    load: async () => {
      set({
        isLoading: true
      })

      const response = await api.get('/courses/1')

      set({
        course: response.data,
        isLoading: false
      })
    }
  }
})

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentLessonIndex, currentModuleIndex } = state

    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return {
      currentLesson,
      currentModule
    }
  })
}
