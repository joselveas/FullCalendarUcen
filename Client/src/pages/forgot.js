import ForgotPassword from './components/ForgotPassword';
function App() {
    return (
      <div className="flex w_full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <ForgotPassword/>
        </div>
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">       
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_nuevo_ucen.png/1200px-Logo_nuevo_ucen.png" 
          className="w-60 h-60 bg-gradient-to-tr  rounded-full animate-bounce" />
          <div className="w-full h-3/2 absolute bottom-0 bg-white backdrop-blur-lg"/>
        </div>
      </div>
    );
  }
  
  export default App;