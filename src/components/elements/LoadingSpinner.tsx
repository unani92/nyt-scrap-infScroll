import { blue500 } from 'lib/styles';
import { ThreeDots } from 'react-loader-spinner';

const LoadingSpinner = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <div className="w-full h-full fixed left-0 top-0 bg-[rgba(255,255,255,0.1)]">
      <ThreeDots
        height="40"
        width="40"
        radius="9"
        color={blue500}
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '100',
        }}
        visible={true}
      />
    </div>
  ) : (
    <></>
  );
};

export default LoadingSpinner;
