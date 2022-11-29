import { iconService } from './services/icon-service.js'

const icon = {
  mounted: (el, binding) => {
    const icon = iconService.getSvg(binding.value)
    el.innerHTML = icon
  },
}

export { icon }
