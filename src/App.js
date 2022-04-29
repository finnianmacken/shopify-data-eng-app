import UploadImage from './components/UploadImage/UploadImage';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <UploadImage />
    </div>
  );
}

export default App;
