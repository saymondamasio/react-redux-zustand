import { ChevronDown } from 'lucide-react'
import { Lesson } from './Lesson'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from '../store'

interface ModuleProps {
  title: string
  amountOfLessons: number
  moduleIndex: number
}

export function Module({ amountOfLessons, title, moduleIndex }: ModuleProps) {
  const { lessons, play, currentLessonIndex, currentModuleIndex } = useStore(
    state => ({
      lessons: state.course?.modules[moduleIndex].lessons,
      play: state.play,
      currentLessonIndex: state.currentLessonIndex,
      currentModuleIndex: state.currentModuleIndex
    })
  )

  const handlePlayLesson = (moduleIndex: number, lessonIndex: number) => {
    return play([moduleIndex, lessonIndex])
  }

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-sm">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                currentLessonIndex === lessonIndex &&
                currentModuleIndex === moduleIndex

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={isCurrent}
                  onPlay={() => handlePlayLesson(moduleIndex, lessonIndex)}
                />
              )
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
