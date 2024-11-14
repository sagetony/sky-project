/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { City_Logo, Cloud1, Cloud2, Cloud3, login_bg } from '../../assets';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BlueButton } from '../../components';
import { toast } from 'sonner';
const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const { name: namee, value } = e.target;
    validateField(namee, value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';

    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === 'password' && !value) {
      newErrors.password = 'Password is required';
    } else if (name === 'email') {
      const emailPattern =
        /^(?!.*\.\.)(?!\.)[a-zA-Z0-9._%+-]{1,64}(?<!\.)@[a-zA-Z0-9-]{1,253}\.[a-zA-Z]{2,}$/;
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!emailPattern.test(value)) {
        newErrors.email = 'Enter a valid email address';
      } else {
        delete newErrors.email;
      }
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      // const res = await AllFxns.login(formData);

      setTimeout(() => {
        setLoading(false);
        handleClearForm();
        toast.success(`Login successful`);
      }, 3000);
      // if (res) {
      //   setLoading(false);
      //   handleClearForm();
      //   toast.success(`Login successful` );
      // }
    } catch (e) {
      setLoading(false);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleClearForm = () => {
    setFormData({
      email: '',
      password: '',
    });
    setErrors({});
  };

  return (
    <div
      className=' pt-20 bg-center relative'
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className='flex lg:flex-row flex-col-reverse lg:min-h-[110vh]   lg:mx-20 mx-5 gap-16 lg:gap-20 py-10 justify-around'>
        <img
          src={Cloud1}
          alt=''
          className='absolute top-20 left-0 blur-sm z-0 w-48 animate-upAndDown'
        />{' '}
        <div className='bg-login text-white z-20 h-fit lg:w-[50%] rounded-xl p-7 px-16 shadow-card'>
          <div className='text-center'>
            <h3 className='font-itim text-3xl mb-14'>
              Welcome back to the metaverse
            </h3>
            <div className='px-8'>
              <form action=''>
                <input
                  type='email'
                  name='email'
                  disabled={loading}
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-lg mt-5 border-2  rounded-md p-5 py-2 bg-[#1B85ED]  ${
                    errors.email ? 'border-red-500' : 'border-white mb-6'
                  }`}
                  placeholder='Email or username'
                />
                {errors.email && (
                  <p className='text-red-200 text-xs mt-1 mb-5 text-left'>
                    {errors.email}
                  </p>
                )}
                <div className='relative'>
                  <input
                    name='password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    disabled={loading}
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-lg  border-2  rounded-md p-5 py-2 bg-[#1B85ED]  ${
                      errors.password ? 'border-red-500' : 'border-white mb-3'
                    }`}
                    placeholder='Password'
                  />

                  <span
                    onClick={togglePasswordVisibility}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[20px] cursor-pointer text-[#44C7FF]'
                  >
                    {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className='text-red-200 text-xs mt-1 mb-3 text-left'>
                    {errors.password}
                  </p>
                )}
                <BlueButton
                  onClick={handleSubmit}
                  loading={loading}
                  loadText='Getting access...'
                  text='Log in'
                  outerClassName='my-6 mb-1 py-0'
                  innerClassName='py-0 text-[16px] '
                />
              </form>
              <p className='text-[#44C7FF] my-2'>Forgot password ?</p>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex-grow border-t border-white'></div>
              <span className='text-white font-medium'>or</span>
              <div className='flex-grow border-t border-white'></div>
            </div>
            <div className='px-8'>
              <BlueButton
                text='Continue with wallet'
                outerClassName='bg-none shadow-none my-16 py-0'
                innerClassName='text-[16px] py-0'
              />
            </div>
          </div>
          <p>
            Don't have an account yet?{' '}
            <a href='#' className='text-[#45c7fe] hover:text-white'>
              Create account
            </a>{' '}
          </p>
        </div>
        <div className='lg:w-1/3 lg:block flex items-center justify-center flex-col'>
          {' '}
          <div className=' animate-breathing -mb-20  '>
            <h2 className='font-itim uppercase text-[#FDFFED] text-xl md:text-xl text-center  absolute z-0 md:left-[94px] left-[100px] top-6 '>
              Welcome to
            </h2>
            <img
              src={City_Logo}
              alt=''
              className='md:w-[320px] md:h-[220px] w-[350px] h-[250px]  '
            />
            <h2 className='font-itim uppercase text-[#DFFEFC] text-xl text-center cursor-pointer hover:text-white md:hover:text-3xl hover:left-[70px] absolute z-50 md:left-[70px] left-[75px] bottom-6 '>
              Start adventure
            </h2>
          </div>{' '}
          <h1 className='font-[600] mt-32  font-fredoka text-5xl text-white  tracking-wide drop-shadow-md'>
            Start Your <br />
            <span className='text-4xl  '>Metaverse World</span>
          </h1>
        </div>{' '}
        <img
          src={Cloud2}
          alt=''
          className='absolute top-[560px] blur-sm left-0 w-52 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[480px] blur-sm top-[250px] right-0 w-52 animate-upAndDown'
        />
      </div>
    </div>
  );
};

export default Login;
