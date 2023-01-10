import { useForm } from '../hook/Form';
import { usePostReviewMutation } from '../store/service/orderService';

const ReviewForm = ({stateData, toggledReview, data }) => {

    const {state, onChange} = useForm({
      rating:"",
      message:"",
    })
    const [submitReview, response]= usePostReviewMutation()
    const addReview = (e)=>{
        e.preventDefault()
        submitReview({...state, user:data?.details?.userId?._id, product:data?.details?.productId?._id, id:data?.details?._id})
    }

  return stateData ? (
    <div className="fixed insert-0 w-full h-full  bg-black/40 z-[1000] flex items items-center justify-center">
      <div className="w-[90%] sm:w-8/12 md:w-6/12 lg:w-4/12">
        <div className="bg-white p-5">
          <h1 className="mb-3 capitalize text-base font-medium text-gray-700">
            add a review
          </h1>
          {
            response?.isError &&

            response?.error?.data?.errors.map((err) =>(
              <p key={err} className="bg-rose-50 py-2.5 text-rose-900 rounded mb-2 font-medium">{err.msg}</p>
            ))
          }
          <form onSubmit={addReview}>
            <div className="mb-3">
              <label
                htmlFor="rating"
                className="mb-2 capitalize font-medium text-sm block"
              >
                rating
              </label>
              <select name="rating" id="rating" className="form-input" onChange={onChange} value={state.rating}>
                <option value="">Choose a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <label
              htmlFor="rating"
              className="mb-2 capitalize font-medium text-sm block"
            >
              message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="5"
              className="form-input"
              placeholder="Write a message"
              onChange={onChange}
              value={state.message}
            />
            <div className="mt-3 flex justify-between">
              <input
                type="submit"
                value="add review"
                className="btn btn-indigo"
              />
              <button
                className="px-4 py-2 text-sm font-medium bg-rose-600 capitalize text-white"
                onClick={() => toggledReview()}
              >
                close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ReviewForm;
