"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Trail } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function ParticleField() {
	const points = useRef<THREE.Points>(null);
	const particleCount = 300;
	const positions = useMemo(() => {
		const positions = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 30;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
		}
		return positions;
	}, []);

	useFrame((state) => {
		if (points.current) {
			points.current.rotation.y = state.clock.getElapsedTime() * 0.1;
			points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
		}
	});

	return (
		<points ref={points}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={particleCount}
					array={positions}
					itemSize={3}
					args={[positions, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.05}
				color="var(--accent-400)"
				transparent
				opacity={0.8}
				sizeAttenuation
			/>
		</points>
	);
}

function FloatingTorus() {
	const meshRef = useRef<THREE.Mesh>(null);
	const { viewport } = useThree();
	const [mouse, setMouse] = useState({ x: 0, y: 0 });

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (meshRef.current) {
			meshRef.current.rotation.x = 0.6 + Math.sin(t * 0.6) * 0.2 + mouse.y * 0.2;
			meshRef.current.rotation.y = 0.6 + Math.cos(t * 0.4) * 0.2 + mouse.x * 0.3;
			meshRef.current.position.y = Math.sin(t * 0.8) * 0.1;
		}
	});

	const onPointerMove = (e: React.PointerEvent) => {
		const x = (e.clientX / viewport.width) * 2 - 1;
		const y = (e.clientY / viewport.height) * 2 - 1;
		setMouse({ x, y });
	};

	return (
		<group onPointerMove={onPointerMove}>
			<mesh ref={meshRef} rotation={[0.4, 0.6, 0]}>
				<torusKnotGeometry args={[1, 0.3, 256, 64]} />
				<meshStandardMaterial 
					color="var(--accent-600)" 
					metalness={0.7} 
					roughness={0.2}
					emissive="var(--accent-500)"
					emissiveIntensity={0.2}
				/>
			</mesh>
		</group>
	);
}

function LightTrails() {
	const trailRef = useRef<THREE.Group>(null);
	
	useFrame((state) => {
		if (trailRef.current) {
			trailRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
		}
	});

	return (
		<group ref={trailRef}>
			{Array.from({ length: 12 }).map((_, i) => (
				<Trail
					key={i}
					width={3}
					length={30}
					color="var(--accent-400)"
					attenuation={(t) => t * t}
				>
					<Sphere
						position={[
							Math.cos((i / 12) * Math.PI * 2) * 4,
							Math.sin((i / 12) * Math.PI * 2) * 0.5,
							Math.sin((i / 12) * Math.PI * 2) * 4,
						]}
						args={[0.08]}
					>
						<meshBasicMaterial color="var(--accent-400)" />
					</Sphere>
				</Trail>
			))}
		</group>
	);
}

function FloatingSpheres() {
	const groupRef = useRef<THREE.Group>(null);
	
	useFrame((state) => {
		if (groupRef.current) {
			groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
			groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
		}
	});

	return (
		<group ref={groupRef}>
			{Array.from({ length: 8 }).map((_, i) => (
				<mesh
					key={i}
					position={[
						Math.cos((i / 8) * Math.PI * 2) * 6,
						Math.sin((i / 8) * Math.PI * 2) * 2,
						Math.sin((i / 8) * Math.PI * 2) * 6,
					]}
				>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshBasicMaterial 
						color="var(--accent-500)" 
						transparent
						opacity={0.6}
					/>
				</mesh>
			))}
		</group>
	);
}

interface Background3DProps {
	intensity?: number;
	showTorus?: boolean;
	showTrails?: boolean;
	showSpheres?: boolean;
}

export function Background3D({ 
	intensity = 1.0, 
	showTorus = true, 
	showTrails = true, 
	showSpheres = true 
}: Background3DProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const glow = useMemo(
		() => ({
			background:
				"radial-gradient(1000px 500px at 20% 20%, var(--accent-400)/0.4, transparent 60%), radial-gradient(1000px 500px at 80% 30%, var(--accent-700)/0.3, transparent 60%), radial-gradient(800px 400px at 50% 70%, var(--accent-500)/0.2, transparent 60%)",
			filter: "blur(80px)",
		}),
		[]
	);

	if (!mounted) {
		return (
			<div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-accent-500/8 to-transparent" />
		);
	}

	return (
		<>
			{/* Enhanced 3D Background */}
			<div className="absolute inset-0 -z-10">
				<Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
					<ambientLight intensity={0.6 * intensity} />
					<directionalLight position={[5, 5, 5]} intensity={1.8 * intensity} />
					<pointLight position={[-5, -5, 5]} intensity={1.0 * intensity} color="var(--accent-400)" />
					<pointLight position={[5, -5, -5]} intensity={0.8 * intensity} color="var(--accent-500)" />
					
					<ParticleField />
					{showTorus && <FloatingTorus />}
					{showTrails && <LightTrails />}
					{showSpheres && <FloatingSpheres />}
					
					<OrbitControls 
						enableZoom={false} 
						enablePan={false} 
						autoRotate 
						autoRotateSpeed={0.3} 
					/>
				</Canvas>
			</div>
			
			{/* Enhanced Glow Effects */}
			<div className="pointer-events-none absolute inset-0 -z-10" style={glow} />
			<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-accent-500/8 to-transparent" />
		</>
	);
}
