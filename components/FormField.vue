<template>
  <div class="FormField">
    <b-field
      :label="label"
      :type="errors.first(identifier) ? 'is-danger' : ''"
      :message="errors.first(identifier)"
    >
      <b-input
        :ref="identifier"
        v-validate="validations"
        :value="baseState[identifier]"
        autocomplete="off"
        :placeholder="placeholder"
        :type="type"
        :icon="icon"
        :password-reveal="passwordReveal"
        :name="identifier"
        :disabled="disabled"
        :loading="loading"
        @keyup.native="changeValue"
        @blur="onFocusOut"
      >
      </b-input>
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FormField',
  props: {
    identifier: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    validations: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    passwordReveal: {
      type: Boolean,
      default: false
    },
    // onChangeValue: {
    //   type: Function,
    //   default: () => {}
    // },
    onFocusOut: {
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      baseState: state => state.baseModule.baseState
    })
  },
  methods: {
    ...mapActions({
      updateAttribute: 'baseModule/updateAttribute'
    }),
    clearCharsByRegex(str, regex) {
      if (!str) return ''
      const strCleared = str.match(regex, '')
      if (!strCleared) return ''
      return strCleared.join('')
    },
    changeValue(e) {
      const value = e.target.value
      this.updateAttribute({
        key: this.identifier,
        value: value
      })
    }
  }
}
</script>
