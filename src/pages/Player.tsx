import { MessageCircle } from 'lucide-react'
import { Header } from '../components/Header'
import { Module } from '../components/Module'
import { Video } from '../components/Video'
import { useEffect } from 'react'
import { useCurrentLesson, useStore } from '../store'

export function Player() {
  const { modules, load } = useStore(state => ({
    modules: state.course?.modules,
    load: state.load
  }))

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson?.title}`
  }, [currentLesson?.title])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" /> Deixar feedback
          </button>
        </div>
        <main className="relative overflow-hidden flex rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 divide-y-2 divide-zinc-950">
            {modules &&
              modules.map((module, index) => (
                <Module
                  key={module.id}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                  moduleIndex={index}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  )
}
