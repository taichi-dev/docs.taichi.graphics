import React, { useRef, useEffect, useState } from 'react';
import MPM from './mpm.wasm';
import MPMJSON from './mpm_aot.json';

enum particleStyleEnum {
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
}

export interface WebAssemblyTaichiMPMCanvasProps {
  canvasBackgroudColor?: string;
  canvasWidth?: number;
  canvasHeight?: number;
  particleStyle?: particleStyleEnum;
  particleRadius?: number;
  theme?: string;
}

const { particle_coordinates, letter_begin, n_particles } = MPMJSON;

// to tweak transparency, see https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4, e.g. 3F, or 7F
export default function WebAssemblyTaichiMPMCanvas({
  canvasBackgroudColor = '#242c34',
  canvasHeight = 400,
  canvasWidth = 760,
  particleStyle = particleStyleEnum.CIRCLE,
  particleRadius = 2.5,
  theme = 'light',
}: WebAssemblyTaichiMPMCanvasProps) {
  // create the canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // helper function to draw particles on the canvas & context
  const drawParticles = (
    cvs: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    sharedData: Float32Array,
    material: Int32Array,
    mousePosX: number,
    mousePosY: number,
  ) => {
    // background
    ctx.fillStyle = canvasBackgroudColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // mouse indicator
    ctx.beginPath();
    ctx.arc(mousePosX, mousePosY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(102, 204, 255, 0.3)';
    ctx.fill();

    // particles
    let initialColor = 'white'; // mainly used for coloring
    for (let i = 0; i < n_particles; i++) {
      // determine color of particles
      if (material[i] === 0) {
        initialColor = '#677CE5';
      } else {
        initialColor = '#13B1BF';
      }

      // get coordinates
      const x = sharedData[i * 2] * cvs.width;
      const y = (0.5 - sharedData[i * 2 + 1]) * cvs.height * 2;

      // determine particle styles
      if (particleStyle === particleStyleEnum.RECTANGLE) {
        ctx.fillStyle = initialColor;
        ctx.fillRect(x, y, particleRadius / 2, particleRadius / 2);
      } else {
        ctx.beginPath();
        ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = initialColor;
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    let requestId: number = 0;

    const init = async (
      cvs: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
    ) => {
      // initialize 46 pages, maximum 96 pages for the SharedArrayBuffer
      let memory = new WebAssembly.Memory({
        initial: 46,
        maximum: 96,
        shared: true,
      });

      // instantiate the WASM module
      // (memory $env.memory (;0;) (import "env" "memory") 2 16384 shared)
      // is required by the assebly code
      const { instance } = await WebAssembly.instantiateStreaming(fetch(MPM), {
        env: { memory: memory },
      });

      const exps = instance.exports;
      // set the context address to head base
      let context_address = exps.__heap_base.value;
      // root buffer contains the Taichi fields
      let root_buffer_address = exps.wasm_materialize(context_address);
      // create array of float args of the Taichi kernels
      let floatArgs = new Float32Array(
        memory.buffer,
        context_address + 4 * 2,
        8,
      );

      // === NOTE: BELOW ARE CUSTOMIZED CODE FOR WASM AOT, THEY DEPEND ON YOUR TAICHI CODE!! ===
      // === NOTE: the calculation is based on the fact that Taichi program is not using packed mode ===
      // === See: https://docs.taichi.graphics/lang/articles/advanced/layout#packed-mode for details ===
      // the 1st Taichi Field x
      let X = new Float32Array(memory.buffer, root_buffer_address, 2048);

      // the 2nd Taichi Field display_x
      const displayXOffset = 2048 * 4 * 2;
      let displayX = new Float32Array(
        memory.buffer,
        root_buffer_address + displayXOffset,
        2048,
      );

      // the 3rd Taichi Field original_x
      const originalXOffset = displayXOffset + 2048 * 4 * 2;
      let originalX = new Float32Array(
        memory.buffer,
        root_buffer_address + originalXOffset,
        2048,
      );

      // the 4th Taichi Field letter_begin_field
      const letterBeginOffset = originalXOffset + 2048 * 4 * 2;
      let letterBeginF = new Int32Array(
        memory.buffer,
        root_buffer_address + letterBeginOffset,
        8,
      );

      // the 5th Taichi Field material
      const materialOffset = letterBeginOffset + 8 * 4;
      let materialF = new Int32Array(
        memory.buffer,
        root_buffer_address + materialOffset,
        2048,
      );

      // the exported Taichi kernels
      const mouseHoverFunc = instance.exports.mouse_hover_body;
      const resetFunc = instance.exports.reset_body;
      const substepFunc = instance.exports.substep_body;

      const initialization = () => {
        // call reset once
        resetFunc(context_address);

        // draw particles once
        drawParticles(cvs, ctx, X, materialF, 0.0, 0.0);

        // pile the imported text array (the text) into Field original_x
        for (let i = 0; i < n_particles; i++) {
          originalX[i * 2] = particle_coordinates[i][0];
          originalX[i * 2 + 1] = particle_coordinates[i][1];
        }

        // pile the imported text array (the letter begin coords) into Field letter_begin_field
        for (let j = 0; j < letter_begin.length; j++) {
          letterBeginF[j] = letter_begin[j];
        }
      };

      initialization();

      let mousePosX = 0;
      let mousePosY = 0;
      // note we cannot call multiple kernels at the same time
      cvs.addEventListener('mousemove', (e) => {
        // get mouse position
        mousePosX = e.offsetX;
        mousePosY = e.offsetY;
      });

      cvs.addEventListener('keydown', (e) => {
        if (e.code === 'KeyR') {
          resetFunc(context_address);
        }
      });

      // Use a larger value for higher-res simulations
      const quality = 1;
      const dt = 1.5e-4 / quality;

      const refreshLoop = () => {
        // call the mouse over kernel
        floatArgs[0] = mousePosX / ctx.canvas.width;
        floatArgs[2] = 1 - mousePosY / ctx.canvas.height;
        mouseHoverFunc(context_address);

        for (let i = 0; i < 8; ++i) {
          substepFunc(context_address);
        }
        // mouseHoverFunc(context_address);
        drawParticles(cvs, ctx, displayX, materialF, mousePosX, mousePosY);
        // recursively request for the next frame
        requestId = window.requestAnimationFrame(refreshLoop);
      };
      refreshLoop();
    };

    init(canvas!, context!);

    // clean up hook by cancelling animation frame requests
    return () => {
      window.cancelAnimationFrame(requestId);
      context!.clearRect(0, 0, canvasWidth, canvasHeight);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="mpm-canvas"
      width={canvasWidth}
      height={canvasHeight}
      style={{ opacity: 1, background: '#000' }}
      tabIndex={1} // this is for the keyDown event to take effect after clicking the canvas
    >
      Sorry, your browser does not support HTML5!
    </canvas>
  );
}
