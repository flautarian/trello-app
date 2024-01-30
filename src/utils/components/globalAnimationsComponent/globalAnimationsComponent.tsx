import { keyframes } from "styled-components";

export type AnimationName = 'appear' | 'disappear' | 'listappear' | 'none';

interface Animation {
    keyframes: ReturnType<typeof keyframes>;
    duration: string;
    type: string;
}

export const animations: Record<AnimationName, Animation> = {
    appear: {
        keyframes: keyframes`
        0% {
            transform: translate(-50%,-25%);
            opacity: 0;
            pointer-events: none;
        }
        100% {
            transform: translate(-50%,-50%);
            opacity: 1;
            pointer-events: auto;
        }
      `,
        duration: "1s",
        type: "ease-in-out",
    },
    disappear: {
        keyframes: keyframes`
        0% {
            transform: translate(-50%,-50%);
            opacity: 1;
            pointer-events: auto;
        }
        100% {
            transform: translate(-50%,-25%);
            opacity: 0;
            pointer-events: none;
        }
      `,
        duration: "0.5s",
        type: "forwards",
    },
    listappear: {
        keyframes: keyframes`
          0% {
            transform: translate(0%,25%);
            opacity: 0;
            pointer-events: none;
        }
        100% {
            transform: translate(0%,0%);
            opacity: 1;
            pointer-events: auto;
          }
        `,
        duration: "0.5s",
        type: "ease-in-out",
    },
    none: {
        keyframes: keyframes`
          0% {} 100% {}
        `,
        duration: "0.5s",
        type: "ease-in",
    }
};

export const authBackgroundAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
`
export const authBackgroundAnimationReverse = keyframes`
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`