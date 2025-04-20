import { Html, useProgress } from '@react-three/drei'

export default function Loader3D() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-32 h-2 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-white">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
}
