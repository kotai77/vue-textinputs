<script lang="ts">
import { defineComponent } from 'vue'
import {InformationCircleIcon} from "@heroicons/vue/outline";
import {searchSuggestionsStore} from "@/stores/searchSuggestions";
import {uuid} from "vue-uuid";

// TODO Implement i18n
// TODO Implement tests
// TODO adjust css classes according to Asport-environment
// TODO Implement icons according to Asport-environment
// TODO Implement range validation for numbers
// TODO Implement patterns according to company policy, (e.g. for passwords)
// TODO Potentially persist data to persistence layer like localStorage if needed
// TODO Potentially emit events to parent components (e.g. to update surrounding layout)
// TODO Implement actual search suggestions
// TODO Check with Valentin regarding the error-msg-always-visible-requirement

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    customValidationMsg: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    tooltip: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    autocomplete: {
      type: String,
      required: false
    },
    pattern: {
      type: String, // Could also be implemented as RegEx
      required: false
    }
  },

  data() {
    const typesMappedToValidationDetails: object = {
      text: {
        pattern: '',
        text: ''
      },
      textarea: {
        pattern: '',
        text: ''
      },
      number: {
        pattern: '',
        text: 'Bitte geben Sie eine Zahl ein.'
      },
      password: {
        pattern: '',
        text: ''
      },
      search: {
        pattern: '^[\\s\\S]{0,255}$',
        text: ''
      },
      email: {
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
        text: 'Bitte geben Sie eine korrekte E-Mail-Adresse ein.'
      }
    }

    return {
      typesMappedToValidationDetails,
      inputValue: this.value || '',
      inputName: this.name || `${this.type}-${uuid.v4()}`,
      showSearchSuggestions: false,
      isValid: true
    }
  },

  computed: {
    searchSuggestions(): Array<string> {
      return searchSuggestionsStore().suggestions
          .filter((item) => item.toLowerCase().includes(this.inputValue.toLowerCase()))
    }
  },

  methods: {
    emitValue(): void {
      if (this.type === 'search'){
        this.$emit('inputUpdated', {
          inputName: this.inputName,
          inputValue: this.inputValue
        })
      }
    },
    selectSearchSuggestion(suggestion: string): void {
      this.inputValue = suggestion
      this?.$refs?.input?.focus()
      this.isValid = true
      this.showSearchSuggestions = false
    }
  },

  components: {
    InformationCircleIcon
  }
})
</script>

<template>
  <div class="form-control w-full mt-6 relative">
    <label v-if="label" :class="`${label} text-left mb-2 ${tooltip ? 'tooltip tooltip-info' : ''}`" :data-tip="tooltip">
      <span class="label-text">
        {{ label }}
        <span v-if="tooltip" class="ml-1" >
          <InformationCircleIcon class="w-5 h-5 -mt-1 inline text-gray-500"/>
        </span>
        <span v-if="isRequired" class="ml-2 text-error">*</span>
      </span>
    </label>
    <textarea
        v-if="type === 'textarea'"
        v-model="inputValue"
        :name="inputName"
        :disabled="isDisabled"
        :required="isRequired"
        :placeholder="placeholder"
        class="textarea textarea-bordered"></textarea>
    <input
        :ref="inputName"
        v-if="type !== 'textarea'"
        v-model="inputValue"
        @focusout="isValid = $event.target.validity.valid"
        @focus="type === 'search' ? showSearchSuggestions = true : ''"
        @keyup="emitValue()"
        :name="inputName"
        :type="type"
        :disabled="isDisabled"
        :required="isRequired"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :pattern="pattern || typesMappedToValidationDetails[type].pattern"
        :class="`input input-bordered w-full ${ isValid ? '' : 'input-error' } ${ $slots.icon ? 'pr-12' : '' }`"/>
    <span v-if="$slots.icon" class="inline-block absolute right-3 bottom-3 text-gray-500">
      <slot name="icon"></slot>
    </span>
    <div v-if="showSearchSuggestions && searchSuggestions.length" class="relative">
      <ul class="p-2 shadow z-10 absolute bg-base-100">
        <li
            v-for="suggestion in searchSuggestions"
            @click="selectSearchSuggestion(suggestion)"
            :key="suggestion"
            class="cursor-pointer text-sm py-1 px-2 text-primary">
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="!isValid" class="alert alert-error shadow-lg py-2 mt-2 rounded-none">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span v-if="isRequired">Pflichtfeld. </span>
      <span>{{ customValidationMsg || typesMappedToValidationDetails[type].text }}</span>
    </div>
  </div>
</template>