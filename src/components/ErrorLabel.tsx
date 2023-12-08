import {Typography} from '@material-tailwind/react';
import React from 'react';

interface ErrorLabelProps {
  errorDesc: string;
}

const ErrorLabel: React.FC<ErrorLabelProps> = ({ errorDesc }) => {
  return (
    <Typography className="text-red-500 font-bold text-2xl text-center pt-24 pb-4">
      Error: {errorDesc}
    </Typography>
  );
};

export default ErrorLabel;