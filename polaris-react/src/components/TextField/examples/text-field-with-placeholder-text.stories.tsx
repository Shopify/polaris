function PlaceholderExample() {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Shipping zone name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Example: North America, Europe"
      autoComplete="off"
    />
  );
}