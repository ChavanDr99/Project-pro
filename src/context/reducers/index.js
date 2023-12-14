import {combineReducers} from 'redux'
import authreducer from './authreducer'
import ProjectReduce from'../reducers/ProjectReduce'
import Serachreduce from './Serachreduce'
const  myredux =combineReducers({
    user:authreducer,
   projects:ProjectReduce,
   searchterm:Serachreduce
})

export default myredux