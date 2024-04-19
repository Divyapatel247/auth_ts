
export const createError = (status:number, message:string)=>{
    const err:any = new Error()
    // const status = (error as any).status;
    err.status= status
    err.message= message
    return err
  } 