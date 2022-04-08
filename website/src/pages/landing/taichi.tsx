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
interface styleItem {
  width?: string;
  height?: string;
  display?: string;
  marginRight?: string;
  marginTop?: string;
  marginLeft?: string;
  marginBottom?: string;
  flex?: number;
}
interface styleProps {
  pc?: styleItem;
  mobile?: styleItem;
}

function generateStyles(params: styleProps) {
  //   const width = window.screen.width;
  //   if (width < 903) {
  //     return params?.mobile ? params?.mobile : params;
  //   }
  return params?.pc ? params?.pc : params;
}

const DevelopOptions = [
  {
    order: ['leftComponent', 'rightComponent'],
    leftComponent: {
      styles: {
        flex: 1,
      },
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
          url: 'https://github.com/taichi-dev/taichi/blob/master/python/taichi/examples/simulation/mpm99.py',
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
      styles: generateStyles({
        pc: {
          width: '547px',
          height: '777px',
          marginRight: '20px',
        },
        mobile: { width: '100%', marginTop: '30px', padding: '0 10px' },
      }),
      type: 'module',
    },
  },
  {
    order: ['rightComponent', 'leftComponent'],
    styles: generateStyles({
      pc: {
        marginTop: '155px',
      },
      mobile: { marginTop: '5px' },
    }),
    leftComponent: {
      child: (context, index) => {
        return (
          <img src={generateUrl(Run_rapidly_img, context.theme, index, '0')} />
        );
      },
      styles: generateStyles({
        pc: {
          width: '698px',
          height: '385px',
          marginTop: '60px',
        },
        mobile: { width: '100%', marginTop: '60px' },
      }),
      type: 'module',
    },
    rightComponent: {
      styles: generateStyles({
        pc: {
          flex: 1,
          marginLeft: '107px',
        },
        mobile: { width: '100%', marginLeft: '' },
      }),
      type: 'template',
      description: 'Run rapidly',
      child: [
        {
          type: 'solid',
          description: 'Born to ',
          link: 'harness parallelism in GPUs and multi-core CPUs',
          url: 'https://github.com/taichi-dev/taichi_benchmark',
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
      styles: generateStyles({
        pc: {
          flex: 1,
        },
        mobile: { width: '100%' },
      }),
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
            style={generateStyles({
              mobile: { marginTop: '40px', width: '80%', marginLeft: '10%' },
            })}
            src={Deploy_univerally_img}
          />
        </div>
      ),
      styles: generateStyles({
        pc: {
          width: '326px',
          height: '273px',
        },
        mobile: { width: '100%' },
      }),
      type: 'module',
    },
  },
  {
    styles: generateStyles({
      pc: {
        marginTop: '262px',
      },
      mobile: { marginTop: '40px' },
    }),
    leftComponent: {
      child: (context, index) => {
        return (
          <img src={generateUrl(DEPLOY_IMG.earth, context.theme, index, '')} />
        );
      },
      styles: generateStyles({
        pc: {
          width: '632px',
          height: '312px',
          marginTop: '20px',
        },
        mobile: { width: '100%' },
      }),
      type: 'module',
    },
    rightComponent: {
      styles: generateStyles({
        pc: {
          marginLeft: '125px',
          flex: 1,
        },
        mobile: { width: '100%', marginLeft: '0' },
      }),
      type: 'template',
      description: 'Openness from heart',
      child: [
        {
          type: 'solid',
          description:
            'With ~200 GitHub contributors from around the globe, Taichi thrives through open-source and would continue fostering its community in return.',
          style: generateStyles({
            pc: {
              width: '390px',
            },
            mobile: { width: '100%' },
          }),
        },
        {
          type: 'solid',
          description:
            'Born from MIT, Taichi has a goal to solve the most head-scratching computer graphics and HPC issues not only for academia but also for industries.',
          style: generateStyles({
            pc: {
              width: '390px',
            },
            mobile: { width: '100%' },
          }),
        },
      ],
    },
  },
];

export default function IndexPage(props: ComponentProps) {
  const { theme, platform } = props;
  return (
    <div className={styles['taichi-box']}>
      <div className={styles['taichi']}>
        <div className={styles['taichi-content']}>
          <div className={styles['develop-background-img']}>
            <Develop
              title="Why Taichi?"
              features={DevelopOptions}
              theme={theme}
              platform={platform}
            />
          </div>
          <div className={styles['deploy-background-img']}>
            <Deploy
              features={DeployOptions}
              theme={theme}
              platform={platform}
            />
          </div>
          <div className={styles['application-background-img']}>
            <Application theme={theme} platform={platform} />
          </div>
          <Contribution theme={theme} platform={platform} />
        </div>
      </div>
      <div className={styles['taichi-images']}></div>
    </div>
  );
}
