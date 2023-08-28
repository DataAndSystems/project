// 接口返回主体
export type IResult<T> = {
    code: string,
    page:string,
    totalRow:string,
    rows: Array<any>,
    data:any,
    message: string,
}

export type ILoginResult = {
    loginTime: string
    pwd: string
    territoryRole: {
        trtyRoleId: number
        trtyRoleName: string
    }
    tid: number
    tname: string
    token: string
    userId: number
    userName: string
    userRole: {
        roleId: number
        userRole: string
    }
    territoryInfo: any
}