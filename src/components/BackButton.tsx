import { ArrowLeft } from 'lucide-react';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} variant="default" size="sm">
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
};

export default memo(BackButton);
