import Form from "./components/Form";
import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <>
      <FormProvider>
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#ffeec7] to-[#c6dbff]">
          <Form />
        </div>
      </FormProvider>
    </>
  );
}

export default App;
