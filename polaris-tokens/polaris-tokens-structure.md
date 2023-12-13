# Polaris Tokens Structure

Quick reference for the structure of Polaris Tokens

## Notation reference

- `--p-` - Default Polaris Tokens prefix
- `-` - Default token name delimiter
- `[x]` - Name of conceptual boundary (required)
- `[x?]` - Name of conceptual boundary (optional)

## High-Level - Token Structure

### Token Structure

`--p-[token-group-name]-[token-name]`

### Examples

- `--p-space-100`
- `--p-color-border`
- `--p-border-radius-100`

## Token Groups - Token Structure

### Border

#### Token Structure

`--p-border-[property]-[alias-or-scale]`

### Examples

- `--p-border-width-100`
- `--p-border-radius-100`
- `--p-border-radius-full`

### Breakpoints

#### Token Structure

`--p-breakpoints-[alias]`

#### Examples

- `--p-breakpoints-xs`
- `--p-breakpoints-sm`
- `--p-breakpoints-md`

### Color

#### Token Structure

##### Default token structure

`--p-color-[element]-[role?]-[prominence?]-[state?]`

##### Specialty token structure

`--p-color-[specialty]-[variant?]-[default-token-structure]`

#### Examples

**Default token structure:**

- `--p-color-text`
- `--p-color-text-secondary`
- `--p-color-text-tertiary`

**Specialty token structure:**

- `--p-color-input-text`
- `--p-color-input-text-secondary`
- `--p-color-input-text-tertiary`

### Font

#### Token Structure

`--p-font-[property]-[alias-or-scale]`

#### Examples

- `--p-font-family-sans`
- `--p-font-size-300`
- `--p-font-line-height-400`

### Height

#### Token Structure

`--p-height-[alias-or-scale]`

#### Examples

- `--p-height-100`
- `--p-height-200`
- `--p-height-300`

### Motion

#### Token Structure

##### Default token structure

`--p-motion-[property]-[alias-or-scale]`

##### Keyframes token structure

`--p-motion-keyframes-[alias]`

#### Examples

**Default token structure:**

- `--p-motion-duration-100`
- `--p-motion-ease`
- `--p-motion-ease-in`

**Keyframes token structure:**

- `--p-motion-keyframes-fade-in`
- `--p-motion-keyframes-fade-out`

### Shadow

#### Token Structure

`--p-shadow-[variant?]-[alias-or-scale]-[state?]`

#### Examples

- `--p-shadow-100`
- `--p-shadow-inset-100`
- `--p-shadow-button`
- `--p-shadow-button-hover`

### Space

#### Token Structure

`--p-space-[alias-or-scale]`

#### Examples

- `--p-space-100`
- `--p-space-200`
- `--p-space-card-gap`
- `--p-space-card-padding`

### Text

#### Token Structure

`--p-text-[variant-size]-[font-token-group-property]`

#### Examples

- `--p-text-heading-xl-font-family`
- `--p-text-heading-xl-font-size`
- `--p-text-heading-xl-font-line-height`

### Width

#### Token Structure

`--p-width-[alias-or-scale]`

#### Examples

- `--p-width-100`
- `--p-width-200`
- `--p-width-300`

### Z-Index

#### Token Structure

`--p-z-index-[alias-or-scale]`

#### Examples

- `--p-z-index-1`
- `--p-z-index-2`
- `--p-z-index-modal`
- `--p-z-index-tooltip`
