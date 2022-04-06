import React from 'react';
import Develop from './Develop';
import Deploy from './Deploy';
import Application from './Applications';
import Contribution from './Contribution';
import { generateUrl } from '../../utils';
import AnimatedTaichiFractal from './AnimatedTaichiFractal';
import { ComponentProps } from './header';

import {
  DEPLOY_IMG,
  Run_rapidly_img,
  Deploy_univerally_img,
} from '../../config';
import styles from './index.module.scss';

function genStyle(width, height) {
  let styles: any = {};
  if (width) {
    styles.width = width;
  } else {
    styles.flex = 1;
  }
  if (height) {
    styles.height = height;
  }
  return styles;
}

const DevelopOptions = [
  {
    leftComponent: {
      styles: genStyle(null, null),
      type: 'template',
      description: 'Develop elegantly',
      child: [
        {
          type: 'solid',
          description:
            'Simple syntax is elegance: No barrier to entry for Python users.',
        },
        {
          description:
            'Naturally integrated into the Python ecosystem, including NumPy and PyTorch.',
        },
        {
          description:
            'Automatic parallelization and differentiation spare you the implementation efforts.',
        },
        {
          description: 'Develop fancy computer graphics programs in less than ',
          link: '99 lines of code',
          url: 'https://zhuanlan.zhihu.com/p/97700605',
        },
      ],
    },
    rightComponent: {
      child: (
        <AnimatedTaichiFractal
          style={{ marginRight: '30px' }}
          language="python"
          title="fractal.py"
        />
      ),
      styles: Object.assign(genStyle('547px', '777px'), { marginRight: '20px' }),
      type: 'module',
    },
  },
  {
    styles: {
      marginTop: '155px',
    },
    leftComponent: {
      child: <img src={Run_rapidly_img} />,
      styles: Object.assign(genStyle('698px', '385px'), { marginTop: '60px' }),
      type: 'module',
    },
    rightComponent: {
      styles: Object.assign(genStyle(null, null), { marginLeft: '107px' }),
      type: 'template',
      description: 'Run rapidly',
      child: [
        {
          type: 'solid',
          description: 'Born to ',
          link: 'harness parallelism in GPUs and multi-core CPUs',
          url: 'https://taichi.graphics/',
        },
        {
          type: 'solid',
          description:
            'Compiled Python just-in-time to binary executable kernels.',
        },
        {
          type: 'solid',
          description:
            'Spatially sparse data structures: No wasted computation in empty space.',
        },
        {
          type: 'solid',
          description:
            'Quantized computation optimizes performance on mobile devices.',
        },
      ],
    },
  },
];
const DeployOptions = [
  {
    leftComponent: {
      styles: {
        flex: 1,
      },
      type: 'template',
      description: 'Deploy universally',
      child: [
        {
          type: 'solid',
          description:
            'Supports multiple backends including x64 & ARM CPUs, CUDA, Vulkan, Metal, and OpenGL Compute Shaders.',
          style: {
            width: '644px',
          },
        },
        {
          type: 'solid',
          description:
            'Ahead-of-time compilation enables deployment on platforms without Python, including PCs, mobile devices, and even web browsers.',
          style: {
            width: '644px',
          },
        },
      ],
    },
    rightComponent: {
      child: (
        <div>
          <img
            style={{
              width: '273px',
              height: '230px',
              display: 'flex',
              margin: '43px 53px 0 0',
            }}
            src={Deploy_univerally_img}
          />
        </div>
      ),
      //   styles: genStyle('326px', '273px'),
      styles: { width: '326px', height: '273px' },
      type: 'module',
    },
  },
  {
    styles: {
      marginTop: '209px',
    },
    leftComponent: {
      child: (context, index) => {
        return (
          <img
            style={{ width: '632px', height: '312px' }}
            src={generateUrl(DEPLOY_IMG.earth, context.theme, index, '')}
          />
        );
      },
      //   styles: genStyle('632px', '312px'),
      styles: { width: '632px', height: '312px' },
      type: 'module',
    },
    rightComponent: {
      //   styles: Object.assign(genStyle(null, null), {
      //     marginLeft: '125px',
      //   }),
      styles: { marginLeft: '125px', flex: 1 },
      type: 'template',
      description: 'Openness from heart',
      child: [
        {
          type: 'solid',
          description:
            'With ~200 GitHub contributors from around the globe, Taichi thrives through open-source and would continue fostering its community in return.',
          style: {
            width: '390px',
          },
        },
        {
          type: 'solid',
          description:
            'Born from MIT, Taichi has a goal to solve the most head-scratching computer graphics and HPC issues not only for academia but also for industries.',
          style: {
            width: '390px',
          },
        },
      ],
    },
  },
];

export default function IndexPage(props: ComponentProps) {
  const { theme } = props;
  return (
    <div className={styles['taichi-box']}>
      <div className={styles['taichi']}>
        <div className={styles['taichi-content']}>
          <div className={styles['develop-background-img']}>
            <Develop title="Why Taichi?" features={DevelopOptions} />
          </div>
          <div
            className={styles['deploy-background-img']}
            style={{ marginTop: '168px' }}
          >
            <Deploy features={DeployOptions} theme={theme} />
          </div>
          <div className={styles['application-background-img']}>
            <Application theme={theme} />
          </div>
          <Contribution theme={theme} />
        </div>
      </div>
      <div className={styles['taichi-images']}></div>
    </div>
  );
}
