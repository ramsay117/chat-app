const GenderRadio = ({ onRadioChange, selectedGender }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Select Gender</span>
      </label>

      <div className="flex gap-4">
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-primary"
            checked={selectedGender === 'male'}
            onChange={() => onRadioChange('male')}
          />
        </label>

        <label className="label cursor-pointer gap-2">
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-primary"
            checked={selectedGender === 'female'}
            onChange={() => onRadioChange('female')}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderRadio;
