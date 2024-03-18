import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import State from 'shared/interface/viewer/State';

import { composeWithDevTools } from '@redux-devtools/extension';

import { Action, COMP_INTERACTION_GROUP_SELECT_FILEID, COMP_INTERACTION_SELECT_DEVICE, COMP_INTERACTION_SELECT_GROUP, COMP_INTERACTION_SELECT_VIEW, RESET_STATE, SELECT_DEVICE, SELECT_GROUP, SELECT_ORG, SET_COMPONENTS, SET_USER } from './Action';

const init_state: State = {
    org: {
        id: '',
        name: '',

    },
    group: {
        id: "",
        name: "",
        isConfigGroup: false
    },
    device: {
        id: "",
        name: "",
        type: 0,
        comment: ''
    },
    user: {
        id: "",
        name: "",
        isSA: false
    },
    components: {},

    interaction: {
        org: {
            main: {
                selectedOrgId: "",
                selectedGroupId: "",
                selectedDeviceId: "",
                selectedViewName: "",
                a: 1
            }            
        },
        group: {
            configfile: {
                fileId: "",
                file: {
                    id: "",
                    name: "",
                    comment: "",
                    data: "",
                    updatedAt: 0,
                    modifier: {
                        id: "",
                        name: ""
                    }
                }
            }
        }     
    },
    version: "v1"
}

function reducer(state: State = init_state, action: Action) {
    const newState = { ...state };
    switch (action.type) {
        case SELECT_ORG:
            if (state.org.id != action.data.org.id) {
                newState.org = action.data.org;
                newState.group = init_state.group;
                newState.device = init_state.device;
            }
            break;

        case SELECT_GROUP:
            if (state.group.id != action.data.group.id) {
                newState.group = action.data.group;
                newState.device = init_state.device;
            }
            break;

        case SELECT_DEVICE:
            newState.device = action.data.device;
            break;

        case RESET_STATE:
            newState.org = init_state.org;
            newState.group = init_state.group;
            newState.device = init_state.device;
            break;

        case SET_COMPONENTS:
            newState.components = action.data;
            break;

        case SET_USER:
            newState.user = action.data.user;
            break;

        case COMP_INTERACTION_SELECT_GROUP:
            newState.interaction.org.main.selectedGroupId = action.data.groupId;
            break;

        case COMP_INTERACTION_SELECT_DEVICE:
            newState.interaction.org.main.selectedDeviceId = action.data.deviceId;
            break;

        case COMP_INTERACTION_SELECT_VIEW:
            newState.interaction.org.main.selectedViewName = action.data.view;
            break;

        case COMP_INTERACTION_GROUP_SELECT_FILEID:
            newState.interaction.group.configfile.fileId = action.data.fileId;
            break;
    
    }
    return newState;
}
const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor };