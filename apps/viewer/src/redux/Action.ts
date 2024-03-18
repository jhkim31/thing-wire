import IDevice from 'shared/interface/device/IDevice';
import IGroup from 'shared/interface/group/IGroup';
import IUser from 'shared/interface/user/IUser';
import IOrganization from 'shared/interface/organization/IOrganization';
import { ComponentInfo } from 'shared/interface/viewer/State';


export const SELECT_ORG = "SELECT_ORG" as const;
export const select_org = (data: {org: IOrganization}) => {
    return {
        type: SELECT_ORG,
        data: data
    }
}

export const SELECT_GROUP = "SELECT_GROUP" as const;
export const select_group = (data: {group: IGroup}) => {
    return {
        type: SELECT_GROUP,
        data: data
    }
}

export const SELECT_DEVICE = "SELECT_DEVICE" as const;
export const select_device = (data: {device: IDevice}) => {
    return {
        type: SELECT_DEVICE,
        data: data
    }
}


export const RESET_STATE = "RESET_STATE" as const;
export const reset_state = () => {
    return {
        type: RESET_STATE
    }
}


export const SET_COMPONENTS = "SET_COMPONENTS" as const;
export const set_components = (data: {[page: string]: ComponentInfo}) => {
    return {
        type: SET_COMPONENTS,
        data: data
    }
}

export const SET_USER = "SET_USER" as const;
export const set_user = (data: {user: IUser}) => {
    return {
        type: SET_USER,
        data: data
    }
}

export const COMP_INTERACTION_SELECT_GROUP = "COMP_INTERACTION_SELECT_GROUP" as const;
export const comp_interaction_select_group = (data: {groupId: string}) => {
    return {
        type: COMP_INTERACTION_SELECT_GROUP,
        data: data
    }
}

export const COMP_INTERACTION_SELECT_DEVICE = "COMP_INTERACTION_SELECT_DEVICE" as const;
export const comp_interaction_select_device = (data: {deviceId: string}) => {
    return {
        type: COMP_INTERACTION_SELECT_DEVICE,
        data: data
    }
}

export const COMP_INTERACTION_SELECT_VIEW = "COMP_INTERACTION_SELECT_VIEW" as const;
export const comp_interaction_select_view = (data: {view: string}) => {
    return {
        type: COMP_INTERACTION_SELECT_VIEW,
        data: data
    }
}

export const COMP_INTERACTION_GROUP_SELECT_FILEID = "COMP_INTERACTION_GROUP_SELECT_FILEID" as const;
export const comp_interaction_group_select_fileid = (data: {fileId: string}) => {
    return {
        type: COMP_INTERACTION_GROUP_SELECT_FILEID,
        data: data
    }
}

export type Action =
    | ReturnType<typeof select_org>
    | ReturnType<typeof select_group>
    | ReturnType<typeof select_device>
    | ReturnType<typeof reset_state>
    | ReturnType<typeof set_components>
    | ReturnType<typeof set_user>
    | ReturnType<typeof comp_interaction_select_group>
    | ReturnType<typeof comp_interaction_select_device>
    | ReturnType<typeof comp_interaction_select_view>
    | ReturnType<typeof comp_interaction_group_select_fileid>