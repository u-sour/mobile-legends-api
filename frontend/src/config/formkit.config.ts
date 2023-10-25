import type { DefaultConfigOptions } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'
const config: DefaultConfigOptions = {
  theme: 'genesis',
  icons: { ...genesisIcons }
}

export default config
