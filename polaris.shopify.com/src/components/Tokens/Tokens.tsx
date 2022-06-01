import { tokens } from "@shopify/polaris-tokens";
import ColorPreview from '../ColorPreview'

interface Props {
  type: string
}

// function Tokens({ type }: Props) {
//   console.log(type)
//   let renderedTokenType
//   switch (type) {
//     case 'color': {
//       const {
//         colorSchemes: { light: colors },
//       } = tokens;
//       const colorNames = Object.keys(colors);
      
//       renderedTokenType = colorNames.map((colorName) => (
//         <ColorPreview key={colorName} name={colorName} />
//       ))
//       break;
//     }
      
  
//     default:{
//       renderedTokenType = <h3>default</h3>
//       break;
//     }
//   }
//   return (
//     <div>
//       <h1>HELLO!!!!!</h1>
//     </div>
//   )
// }

const Tokens = () => {
  return <h1>hellllloooooooo</h1>
}

export default Tokens;
