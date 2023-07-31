export const state = () => ({
    USER: null
});

export const mutations = {
    SET_USER(state, user) {
        state.USER = user;
    }
};

export const actions = {
    setUser(vuexContext, user) {
        vuexContext.commit('SET_USER', user);
    }
};

export const getters = {
    GET_USER(state) {
        return state.USER;
    }
};
