import Spinner from 'react-bootstrap/Spinner';

export const LoadingArea = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
