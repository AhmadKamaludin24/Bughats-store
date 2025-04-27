
'use client'
import React from 'react'
import { Canvas, useThree  } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center} from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import * as THREE from 'three'
import { useEffect } from 'react'
import Loader3D from '../loaders/Loader3D'


function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const clonedScene = useMemo(() => clone(scene), [scene])

  // Panggil onLoad saat model siap
 

  return (
    <Center>
      <primitive object={clonedScene} scale={1.5} />
    </Center>
  )
} 

function HDRIEnvironment({ url }: { url: string }) {
  const { scene } = useThree()

  useEffect(() => {
    new RGBELoader().load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture  // lighting & reflections only
      // scene.background = texture // ❌ jangan dipakai kalau mau transparan
    })
  }, [scene, url])

  return null
}


const Display3d = ({model}: {model: string}) => {
  if (!model) {
    return <div>No model to display</div>;  // Show a fallback when no model is available
  }
  console.log(model)
  return (
    <Canvas
    style={{ width: '100%', height: '100%' }}
    camera={{ position: [0, 1.5, 3], fov: 20 }}
    >
      <HDRIEnvironment url="/paul_lobe_haus_2k.hdr" />
      <Suspense fallback={<Loader3D/>}>
        <Model url={model}  />
      </Suspense>
      <OrbitControls enableZoom={true} autoRotate rotateSpeed={2.5}/>
  </Canvas> 
  )
}

export default Display3d
