export const state = () => ({
    SETTING: {}
});

export const mutations = {
    SAVE_SETTING(state, data) {
        state.SETTING = data;
    }
};

export const actions = {
    setSetting(vuexContext, data) {
        vuexContext.commit('SAVE_SETTING', data);
    }
};

export const getters = {
    GET_SETTING(state) {
        return state.SETTING;
    }
};
