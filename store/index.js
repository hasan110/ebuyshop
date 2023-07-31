export const state = () => ({
    LOGOUT_DIALOG: false
});

export const mutations = {
    SET_LOGOUT_DIALOG(state, status) {
        state.LOGOUT_DIALOG = status;
    }
};

export const actions = {
    setLogoutDialog(vuexContext, status) {
        vuexContext.commit('SET_LOGOUT_DIALOG', status);
    }

};

export const getters = {

};