import { useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

const TopLoadingBar = ({ loading }: { loading: boolean }) => {
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => {
    if (loading) {
      ref.current?.start('continuous');
    } else {
      ref.current?.complete();
    }
  }, [loading]);

  return (
    <LoadingBar color="var(--foreground)" ref={ref} shadow={true} height={3} />
  );
};

export default TopLoadingBar;
