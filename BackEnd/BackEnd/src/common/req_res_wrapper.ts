
export class CtrlReq {
    body: any

    constructor(msg: any) {
        this.body = msg
    }
}

export const reqFactory = (body) => {
    return new CtrlReq(body)
}

export class CtrlRes {
    _status: number
    sendCbk: (msg)=>void

    constructor(sendCbk:  (msg)=>void) {
        this.sendCbk = sendCbk
    }
    status(status: number) {
        this._status = status
        return this
    }

    send(obj) {
        console.log("sdsd")
        this.sendCbk(obj)
    }
}

export const resFactory = (sendCbk: (msg)=>void) => {
    return new CtrlRes(sendCbk)
}