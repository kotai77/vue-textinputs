<script setup lang="ts">
import UserInput from "@/components/UserInput.vue";
import {SearchCircleIcon} from "@heroicons/vue/outline";
</script>

<template>
  <main>
    <div class="w-96 m-auto">
      <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">

        <UserInput
            type="text"
            label="Required Textinput mit Placeholder, Tooltip, Custom Validation Pattern und Message"
            tooltip="Textinput Tooltip"
            :is-required="true"
            pattern="[A-Za-z]{3}"
            custom-validation-msg="Bitte geben sie 3 Buchstaben ein."
            placeholder="Text-Input mit Placeholder">
        </UserInput>

        <UserInput
            type="search"
            label="Optionaler Search-Input mit Icon"
            :is-required="true"
            placeholder="Tippen Sie a und dann s...">
          <template v-slot:icon>
            <SearchCircleIcon class="h-6 w-6"/>
          </template>
        </UserInput>

        <UserInput
            type="number"
            label="Prefilled Number Input"
            value="10">
        </UserInput>

        <UserInput
            type="email"
            name="email"
            label="Email Input">
        </UserInput>

        <UserInput
            type="text"
            label="Disabled Text Input"
            :is-disabled="true"
            placeholder="Disabled">
        </UserInput>

        <UserInput
            type="textarea"
            label="Optionale Textarea"
            placeholder="Tippen Sie hier...">
        </UserInput>

        <input class="btn mt-12" type="submit" value="Senden">
      </form>
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";
</style>
