---
name: InContextLearning
category: Overlays
platforms:
  - web
keywords:
  - interactive
  - container
  - overlay
---

# InContextLearning

Lorem ipsum dolor

---

## Examples

### Default Setup

```jsx
function DefaultSetupExample() {
  function StepOne() {
    return <div>First Step</div>;
  }

  function StepTwo() {
    return <div>Second Step</div>;
  }

  function StepThree() {
    return <div>Third Step</div>;
  }

  return (
    <InContextLearningContextProvider
      stepComponents={[
        <StepOne key={0} />,
        <StepTwo key={1} />,
        <StepThree key={2} />,
      ]}
    >
      <div>
        <InContextLearning.Step stepIndex={0}><p style={{ display: 'inline-block', margin: '100px' }}>Content 1</p></InContextLearning.Step>
        <InContextLearning.Step stepIndex={1}><p style={{ display: 'inline-block', margin: '100px' }}>Content 2</p></InContextLearning.Step>
        <InContextLearning.Step stepIndex={2}><p style={{ display: 'inline-block', margin: '100px' }}>Content 3</p></InContextLearning.Step>
      </div>
      <InContextLearning/>
    </InContextLearningContextProvider>
  );
}
```

### Interactive Step

```jsx
function InteractiveStepExample() {
  function StepOne() {
    const [count, setCount] = useState(0)
    return <div><button onClick={() => setCount(count + 1)}>Add</button> First Step {count}</div>;
  }

  return (
    <InContextLearningContextProvider
      stepComponents={[
        <StepOne key={0} />,
      ]}
    >
      <div>
        <InContextLearning.Step stepIndex={0}><p style={{ display: 'inline-block', margin: '100px' }}>Content 1</p></InContextLearning.Step>
      </div>
      <InContextLearning/>
    </InContextLearningContextProvider>
  );
}
```