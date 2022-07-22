function RangeSliderWithPreciseRangeControlExample() {
  const [rangeValue, setRangeValue] = useState(4);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  return (
    <Card sectioned title="Navigation branding">
      <RangeSlider
        output
        label="Logo offset"
        min={-20}
        max={20}
        step={4}
        value={rangeValue}
        onChange={handleRangeSliderChange}
      />
    </Card>
  );
}