import { Pipe, PipeTransform } from "@angular/core";

@Pipe
({
name:'convertBooleans'
})

export class ConvertBooleans implements PipeTransform{

    transform(value: any, ...args: any): string 
    {
        return value ? "Passed" : "Failed";
    }

}