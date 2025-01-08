import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// declare keyword indicates that this variable is being declared but not assigned a value directly within this code. globalThis is a built-in object that provides a standard way to access the global object across different environments.
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton(); // Uses the nullish coalescing operator (??). This returns the right-hand side operand if the left-hand side operand is null or undefined. And the left-hand side operand otherwise.

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
