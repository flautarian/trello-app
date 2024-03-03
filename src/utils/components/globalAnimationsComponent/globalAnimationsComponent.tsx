import { keyframes } from 'styled-components';
import { Keyframes } from 'styled-components/dist/types';

export type AnimationName = 'appear' | 'disappear' | 'fadeInBackground' | 'fadeOutBackground' | 'none';

interface Animation {
    keyframes: (params: any) => Keyframes;
    duration: string;
    type: string;
}

export const animations: Record<AnimationName, Animation> = {
    appear: {
        keyframes: (params: any) => keyframes`
            0% {
                transform: translate(${params.$xorigin || '0%'}, ${params.$yorigin || '0%'});
                opacity: 0;
                pointer-events: none;
            }
            100% {
                transform: translate(${params.$xtarget || '-50%'}, ${params.$ytarget || '-50%'});
                opacity: 1;
                pointer-events: auto;
            }
        `,
        duration: '0.5s',
        type: 'ease-in-out',
    },
    disappear: {
        keyframes: (params: any) => keyframes`
            0% {
                transform: translate(${params.$xtarget || '-50%'}, ${params.$ytarget || '-50%'});
                opacity: 1;
                pointer-events: auto;
            }
            100% {
                transform: translate(${params.$xorigin || '0%'}, ${params.$yorigin || '0%'});
                opacity: 0;
                pointer-events: none;
            }
        `,
        duration: '0.5s',
        type: 'forwards',
    },
    none: {
        keyframes: (params: any) => keyframes`
            0% {} 
            100% {}
        `,
        duration: '0.5s',
        type: 'ease-in',
    },
    fadeInBackground: {
        keyframes: (params: any) => keyframes`
            0% {
                background-color: rgba(0,0,0,0);
                pointer-events: none;
            }
            100% {
                background-color: rgba(0,0,0,0.5);
                pointer-events: auto;
            }
        `,
        duration: '0.3s',
        type: 'forwards',
    },
    fadeOutBackground: {
        keyframes: (params: any) => keyframes`
            0% {
                background-color: rgba(0,0,0,0.5);
                pointer-events: none;
            }
            100% {
                background-color: rgba(0,0,0,0);
                pointer-events: auto;
            }
        `,
        duration: '0.5s',
        type: 'forwards',
    }
};

export const authBackgroundAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
`;

export const authBackgroundAnimationReverse = keyframes`
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;