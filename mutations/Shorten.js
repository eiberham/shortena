import { gql } from 'apollo-boost';

export default gql`
    mutation Shorten($url: String){
        shorten(url: $url){
            short
            target
        }
    }
`;