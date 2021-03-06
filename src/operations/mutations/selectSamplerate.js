import { gql, useMutation } from "@apollo/client";
//import { GET_SESSION } from "../queries/getSession";
import { GET_SAMPLERATE } from "../queries/getSamplerate";

export const SELECT_SAMPLERATE = gql`
    mutation SelectSamplerate($id:ID!, $samplerate:String!){
        selectSamplerate(id:$id, samplerate:$samplerate){
            id
            samplerate
        }
    }
`;

export function useSelectSamplerate(){
    const [ mutate, { data, error } ] = useMutation(SELECT_SAMPLERATE, {
        update (cache, { data }) {
            const { selectSamplerate } = data;
            const { samplerate } = cache.readQuery({query: GET_SAMPLERATE, variables:{id:selectSamplerate.id}});
            //const { session } = cache.writeQuery({query: GET_SESSION, variables:{id:selectDevice.id}});
            //console.log('select samplerate=====>', selectSamplerate.samplerate);
            
            /*
            cache.modify({
                fields: {
                    samplerate(existingSamplerateRefs={}, { readField }) {
                        console.log('existingSamplerateRefs=====>', existingSamplerateRefs, ' ', readField);
                        return {...existingSamplerateRefs, samplerate:selectSamplerate.samplerate }
                    },
                },
            });
            */
            
            cache.writeQuery({
                query: GET_SAMPLERATE,
                variables:{id:selectSamplerate.id},
                data: {
                    samplerate: {...samplerate, samplerate:selectSamplerate.samplerate}
                }
            });
        }
    });
    return { mutate, data, error };
}
 
