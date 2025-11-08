export interface registerType {
    name?: string;
    email: string;
    password: string;
    password2?: string;
    identity?: string;
}


// 註冊規則
export interface registerRulesType {
    name?: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    email: {
        type: string;
        required: boolean;
        message: string;
        trigger: string;
    }[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    password2?: ({
        min: number;
        max: number;
        message: string;
        trigger: string;
    } | {
        validator: (rule: any, value: string, callback: any) => void;
        trigger: string;
    })[];
}

// user 的資料 (存放 localStorage 內)
export interface userType {
    // 放入需要的資料類型(參看回傳的資料)
    id: Number,
    email: String,
    username: String,
    avatar?: String,
}