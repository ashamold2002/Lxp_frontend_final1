import axios from "axios";
import { FETCH_CONTENT_URL_REQUEST,fetchContentUrlSuccess,fetchContentUrlFailure } from "../../action/Course/FetchContentUrlAction";
 
const fetchContentUrlApi = ({ dispatch }) => (next) => async (action) => {
  next(action);
 
  if (action.type === FETCH_CONTENT_URL_REQUEST) {
    try {
      // console.log("x"+action.payload.topicId);
      // console.log(`http://localhost:5199/lxp/course/topic/${action.payload.topicId}/materialtype/${action.payload.materialTypeId}`);
      axios.get(action.payload, { responseType: 'blob' })
      .then((response) => {
        // Create a Blob from the response
       const blob = new Blob([response.data], { type: response.data.type });
        var materialname=action.payload.split("/");
        var file = new File([blob], `${materialname[materialname.length-1]}`, { type: blob.type, lastModified: Date.now() })
        // Dispatch the action with the Blob
        dispatch(fetchContentUrlSuccess(file));
      })
      .catch((error) => {
        console.error(error);
      });
    
      // console.log('API Response for fetch:', response.data); // Log the response data
      
        // dispatch(fetchContentSuccess(response.data.data));
      
    } catch (error) {
      console.error('API Error:', error.message);
      dispatch(fetchContentUrlFailure(error.message));
    }
  }
  return next(action)
};
export default fetchContentUrlApi;
