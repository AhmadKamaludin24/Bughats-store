// components/Model.tsx
import { useGLTF } from '@react-three/drei'

export function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}
