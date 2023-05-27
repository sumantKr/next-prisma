import { PrismaClient } from '@prisma/client'
let prisma: PrismaClient = new PrismaClient()


declare global {
    namespace NodeJS {
        interface Global { }
    }
}

interface CustomNodeJSGlobal extends NodeJS.Global {
    prisma: PrismaClient
}
declare const global: CustomNodeJSGlobal

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}


export default prisma;