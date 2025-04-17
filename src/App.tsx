import { Route, Routes } from 'react-router';

import { CreatePublisher } from '@/pages/CreatePublisher';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CreatePublisher />} />
    </Routes>
  );
};

export default App;
