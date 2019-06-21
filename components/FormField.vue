<template>
  <div class="FormField">
    <b-field
      :label="label"
      :type="errors.first(identifier) ? 'is-danger' : ''"
      :message="errors.first(identifier)"
    >
      <b-input
        v-if="type === 'text' || type === 'password'"
        :ref="identifier"
        v-model="model"
        v-validate="validations"
        autocomplete="off"
        :placeholder="placeholder"
        :type="type"
        :icon="icon"
        :password-reveal="passwordReveal"
        :name="identifier"
        :disabled="disabled"
        :loading="loading"
        :use-html5-validation="false"
        @blur="onFocusOut"
      >
      </b-input>
      <b-select
        v-if="type === 'select'"
        v-model="model"
        :placeholder="placeholder"
        expanded
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </b-select>
      <b-autocomplete
        v-if="type === 'autocomplete'"
        v-model="model"
        :data="options"
        :placeholder="placeholder"
        :icon="icon"
        :loading="loading"
        @typing="typing"
        @select="option => (selected = option)"
      >
        <template slot-scope="props">
          <div class="media">
            {{ props.option.localidade }}
            <br />
          </div>
        </template>
        <template slot="empty">{{ noResultsMessage }}</template>
      </b-autocomplete>
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FormField',
  inject: ['$validator'],
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
    validChars: {
      type: RegExp,
      required: false,
      default: () => /a-z/g
    },
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
    },
    typing: {
      type: Function,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => []
    },
    noResultsMessage: {
      type: String,
      default: 'Nenhum registro encontrado'
    }
  },
  computed: {
    ...mapState({
      baseState: state => state.baseModule.baseState
    }),
    model: {
      get: function() {
        return this.baseState[this.identifier]
      },
      set: function(value) {
        this.updateAttribute({ key: this.identifier, value })
      }
    }
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
    }
  }
}
</script>
