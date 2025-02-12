"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function TGraphics({ graphicsData, setCameraRef }) {
  useEffect(() => {
    const canvas = document.querySelector("#three_canvas");

    var scene = new THREE.Scene();

    const fov = 75;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const near = 0.1;
    const far = 5000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    setCameraRef(camera);
    camera.position.z = 1;

    let octaArr = [];
    let randArr = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 20; k++) {
          let r = 0.3 * 1;
          let geometry = new THREE.BoxGeometry(r, r, r);
          let material = new THREE.MeshPhongMaterial({ color: 0xaa8844 });
          let octa = new THREE.Mesh(geometry, material);
          octa.position.x = 3 - i * 2;
          octa.position.y = 3 - j * 2;
          octa.position.z = 3 - k * 2;
          scene.add(octa);
          octaArr.push(octa);
          randArr.push(Math.random());
        }
      }
    }

    const color = 0xffffff;
    const intensity = 7.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(100, 100, 100);
    scene.add(light);

    const lightA = new THREE.AmbientLight(0x404040); // soft white light
    // scene.add( lightA );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render(time) {
      time *= 0.001;
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      octaArr.forEach((cube, ndx) => {
        let speed = 0.0;
        if (randArr[ndx] < 0.95) {
          speed = (0.02 + randArr[ndx] * 1) / 5;
        } else {
          speed = (0.02 + randArr[ndx] * 5) * 1 + 1;
        }
        const rot = time * speed;
        // cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);

  return (
    <div>
      <canvas id="three_canvas" className="w-96 h-96 m-5"></canvas>
    </div>
  );
}
