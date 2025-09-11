"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Background3D = dynamic(() => import("./background-3d").then(mod => ({ default: mod.Background3D })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-accent-500/8 to-transparent" />
  )
});

interface Background3DWrapperProps {
  intensity?: number;
  showTorus?: boolean;
  showTrails?: boolean;
  showSpheres?: boolean;
  showGrid?: boolean;
}

export function Background3DWrapper(props: Background3DWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-accent-500/8 to-transparent" />
    );
  }

  return <Background3D {...props} />;
}
