import { Toaster } from 'sonner';

const CustomToastContainer = ({ ...props }) => (
  <Toaster
    richColors
    expand={false}
    {...props}
    position='top-right'
    className=' text-body-text '
  />
);

export default CustomToastContainer;
