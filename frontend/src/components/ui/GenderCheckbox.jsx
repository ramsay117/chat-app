const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
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
            onChange={() => onCheckboxChange('male')}
          />
        </label>

        <label className="label cursor-pointer gap-2">
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-primary"
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
