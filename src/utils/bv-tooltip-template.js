import Vue from './vue'
import { BVPopper } from './bv-popper'

const NAME = 'BVTooltipTemplate'

// @vue/component
export const BVTooltipTemplate = /*#__PURE__*/ Vue.extend({
  name: NAME,
  extends: BVPopper,
  inheritAttrs: false,
  props: {
    title: {
      // Text string, Array<vNode>, vNode
      type: [String, Array, Object],
      default: ''
    },
    content: {
      // Text string, Array<vNode>, vNode
      // Alias/Alternate for title for tolltip
      type: [String, Array, Object],
      default: ''
    },
    variant: {
      type: String,
      default: null
    },
    customClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    templateType() {
      return 'tooltip'
    },
    templateClasses() {
      return [
        {
          [`b-${this.templateType}-${this.variant}`]: this.variant,
          // `atachment` will come from BVToolpop
          [`bs-${this.templateType}-${this.attachment}`]: this.attachment
        },
        this.customClass
      ]
    },
    templateAttributes() {
      return {
        role: 'tooltip',
        tabindex: '-1',
        ...this.$attrs
      }
    }
  },
  methods: {
    renderTemplate(h) {
      return h(
        'div',
        {
          staticClass: 'tooltip b-tooltip',
          class: this.templateClasses,
          attrs: this.templateAttributes
        },
        [
          h('div', { staticClass: 'arrow' }),
          h('div', { staticClass: 'tooltip-inner' }, [this.title || this.content || h()])
        ]
      )
    }
  }
})