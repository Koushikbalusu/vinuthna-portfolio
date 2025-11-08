import '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      sphereGeometry: any
      meshStandardMaterial: any
    }
  }
}

