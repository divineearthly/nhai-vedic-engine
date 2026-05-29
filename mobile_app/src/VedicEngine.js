import { NativeModules } from 'react-native';

const { VedicEngine } = NativeModules;

export default {
    /**
     * Checks if the INT4 Edge Runtime is active.
     */
    checkStatus: async () => {
        return await VedicEngine.checkStatus();
    },

    /**
     * Passes two camera frames to the C++ kernel for 
     * O(1) matching and Dharana liveness checks.
     */
    authenticateFace: async (base64Frame1, base64Frame2) => {
        const resultString = await VedicEngine.authenticateFace(base64Frame1, base64Frame2);
        return JSON.parse(resultString);
    }
};
