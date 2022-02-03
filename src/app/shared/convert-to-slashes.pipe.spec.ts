import { ConvertToSlashes } from "./convert-to-slashes.pipe"

describe('SlashesPipe', () => {
    it('should replace character with a slash', () => {
        //assert
        let pipe = new ConvertToSlashes();
        let stringToTransform = '1st-January'

        //act
        expect(pipe.transform(stringToTransform,'-')).toEqual('1st /January');
        
    })
})