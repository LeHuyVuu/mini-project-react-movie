import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

function GalaxyBackground() {
    const starRef = useRef();

    useFrame(() => {
        if (starRef.current) {
            starRef.current.rotation.x += 0.0005;
            starRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <Stars
            ref={starRef}
            radius={5} // Bán kính của hệ sao
            depth={50} // Độ sâu
            count={1000} // Số lượng sao
            factor={4} // Khoảng cách giữa các sao
            saturation={0} // Độ bão hòa màu (0 = trắng)
            fade // Làm mờ dần các sao xa
        />
    );
}

export default function BackgroundGalaxy() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <GalaxyBackground />
        </Canvas>
    );
}
