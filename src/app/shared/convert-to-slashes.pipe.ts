import { Pipe, PipeTransform } from "@angular/core";

@Pipe
({
name:'convertToSlashes'
})

export class ConvertToSlashes implements PipeTransform{
    transform(value: string, character: string): string 
    {
        return value.replace(character, ' /');
    }

}