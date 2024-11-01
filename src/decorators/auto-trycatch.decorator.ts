import { InternalServerErrorException } from "@nestjs/common";

export function AutoTryCatch(): MethodDecorator {
  return function(_, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error.status) throw error;
        console.log(`[${propertyKey.toString()}]`, error);
        throw new InternalServerErrorException(error.message);
      }
    };
    return descriptor;
  };
}
