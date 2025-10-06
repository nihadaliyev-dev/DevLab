import { useForm } from "../context/FormContext";

const Step3Preview = () => {
  const { formData } = useForm();
  return (
    <div className="grid grid-cols-1">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">Name</p>
        <p className="font-light text-lg text-[#363636]">{formData.name}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">Surname</p>
        <p className="font-light text-lg text-[#363636]">{formData.surname}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">Email</p>
        <p className="font-light text-lg text-[#363636]">{formData.email}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">Phone Number</p>
        <p className="font-light text-lg text-[#363636]">
          {formData.phoneNumber}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">Education Level</p>
        <p className="font-light text-lg text-[#363636]">
          {formData.educationLevel}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">University</p>
        <p className="font-light text-lg text-[#363636]">
          {formData.university}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">Company</p>
        <p className="font-light text-lg text-[#363636]">{formData.company}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-[#212121]">Others</p>
        <p className="font-light text-lg text-[#363636]">{formData.others}</p>
      </div>
    </div>
  );
};

export default Step3Preview;
