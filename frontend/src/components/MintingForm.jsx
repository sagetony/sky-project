import { Cloud1, Cloud2, Cloud3, login_bg } from "../assets";
import { BlueButton } from "./Button";

const MintingForm = () => {
  return (
    <div
      className="pt-20 bg-center relative"
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className="flex flex-col-reverse lg:min-h-[110vh] lg:mx-20 gap-16 lg:gap-20 py-10 justify-center">
        <img
          src={Cloud1}
          alt=""
          className="absolute top-20 left-0 blur-sm z-0 w-48 animate-upAndDown"
        />
        <div className="bg-login mt-14 md:w-1/2 sm:w-2/3 sm:mx-auto mx-5 rounded-[50px] text-white z-20 h-fit p-7 px-16 shadow-card">
          <div className="text-center">
            <h3 className="font-itim text-3xl mb-8">NFT Minting</h3>
            <div className="px-8">
              <form action="">
                {/* Name Input */}
                <input
                  type="text"
                  name="name"
                  placeholder="Location Name"
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] mt-5 border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                />

                {/* Email Input */}
                <input
                  type="text"
                  name="zone"
                  placeholder="Land Zone"
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                />

                {/* Wallet Address Input */}
                <input
                  type="text"
                  name="coordinates"
                  placeholder="Coordinates"
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                />

                <input
                  type="text"
                  name="price"
                  placeholder="Land Price"
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                />
                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm text-white">
                    Upload Land Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="block w-full text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#44C7FF] file:text-white hover:file:bg-[#1B85ED]"
                  />
                </div>

                {/* Additional Input */}
                <textarea
                  name="description"
                  placeholder="Description"
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                ></textarea>

                {/* Submit Button */}
                <BlueButton
                  loadText="Getting access..."
                  text="Mint NFT"
                  outerClassName="my-6 mb-1 py-0"
                  innerClassName="py-0 text-sm"
                />
              </form>
            </div>
          </div>
        </div>
        <img
          src={Cloud2}
          alt=""
          className="absolute top-[700px] md:top-[560px] blur-sm left-0 w-52 animate-upAndDown"
        />
        <img
          src={Cloud3}
          alt=""
          className="absolute md:top-[480px] blur-sm top-[350px] right-0 w-52 animate-upAndDown"
        />
      </div>
    </div>
  );
};

export default MintingForm;
