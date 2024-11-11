/* eslint-disable react/prop-types */
const PurpleButton = ({ icon, text, innerClassName, outerClassName }) => {
  return (
    <button
      className={`shadow-custom-inset-top w-full py-0 rounded-full text-white hover:text-[#a874ff] text-3xl hover:from-white  hover:to-white bg-gradient-to-r from-[#b084ff] to-[#a874ff] border-2 border-[#e3caff] ${outerClassName} `}
    >
      <span
        className={`flex shadow-custom-inset-bottom items-center justify-center gap-6 w-full py-2 rounded-full text-3xl ${innerClassName}`}
      >
        {icon}
        {text}
      </span>
    </button>
  );
};
const BlueButton = ({ icon, text, innerClassName, outerClassName }) => {
  return (
    <button
      className={`${outerClassName} shadow-custom-inset-top w-full py-0 rounded-full text-white hover:text-[#1e90ff] text-3xl hover:from-white  hover:to-white bg-gradient-to-r from-[#51d2ff] to-[#1e90ff] border-2 border-[#c9ebff] `}
    >
      <span
        className={`flex shadow-custom-inset-bottom items-center justify-center gap-6 w-full py-2 rounded-full text-3xl ${innerClassName}`}
      >
        {icon}
        {text}
      </span>
    </button>
  );
};

export { PurpleButton, BlueButton };
