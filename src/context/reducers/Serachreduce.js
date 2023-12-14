const Serachreduce =(state="",action)=>{
    switch(action.type){
        case "SET_SEARCH_TERM":
            return{
                ...state,
                searchterm:action.searchterm
            }
            case "SET_SEARCH_TERM_NULl":
                return{
                    ...state,
                    searchterm:null
                }
            default:
                return state
    }
    }
    export default Serachreduce