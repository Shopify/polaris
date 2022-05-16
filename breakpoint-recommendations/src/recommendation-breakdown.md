```
| 0px ->
| xs
        | 490px ->
        | sm
                  | 768px ->
                  | md
                            | 1040px ->
                            | lg
                                      | 1400px ->
                                      | xl
```

- if `size < sm`
  - if `size < half-xs`
    - if `isUpCondition`
      - xs-up
    - else `isDownCondition`
      - sm-down
  - else `size >= half-xs`
    - if `isUpCondition`
      - sm-up
    - else `isDownCondition`
      - sm-down
- if `size < md`
  - if `size < half-sm`
    - if `isUpCondition`
      - sm-up
    - else `isDownCondition`
      - sm-down
  - else `size >= half-sm`
    - if `isUpCondition`
      - md-up
    - else `isDownCondition`
      - md-down
- if `size < lg`
  - if `size < half-md`
    - if `isUpCondition`
      - md-up
    - else `isDownCondition`
      - md-down
  - else `size >= half-md`
    - if `isUpCondition`
      - lg-up
    - else `isDownCondition`
      - lg-down
- if `size < xl`
  - if `size < half-lg`
    - if `isUpCondition`
      - lg-up
    - else `isDownCondition`
      - lg-down
  - else `size >= half-lg`
    - if `isUpCondition`
      - xl-up
    - else `isDownCondition`
      - xl-down
- else `size >= xl`
  - if `isUpCondition`
    - xl-up
  - else `isDownCondition`
    - remove
