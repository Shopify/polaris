import Tokens from '../../src/components/Tokens'

export const tokens = {
  render: Tokens,
  description: 'Displays the passed token category in a copy/paste table',
  selfClosing: true,
  attributes: {
    type: {
      type: String,
      matches: ['color', 'spacing', 'z-index', 'depth', 'motion'],
      errorLevel: 'critical',
      required: true,
      description:
        'Controls the type of token that gets rendered. Can be: "color", "spacing", "z-index", "depth", "motion"'
    }
  }
}