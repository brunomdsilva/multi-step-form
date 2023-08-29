<template>
	<div class="flex items-center gap-4" :class="isFirstStep ? 'justify-end' : 'justify-between'">
		<button
			v-if="!isFirstStep"
			@click.prevent="store.backStep()"
			class="p-2 text-secondary-cool-gray hover:text-primary-marine-blue transition-colors duration-300"
		>
			Go Back
		</button>

		<button
			@click.prevent="isLastStep ? $emit('submit') : store.nextStep()"
			v-text="isLastStep ? 'Confirm' : 'Next Step'"
			class="px-8 py-3 rounded-lg text-white hover:bg-opacity-80 transition-colors duration-300"
			:class="isLastStep ? 'bg-primary-purplish-blue ' : 'bg-primary-marine-blue '"
		/>
	</div>
</template>

<script setup>
import { useFormStore } from "@/stores/form";

const store = useFormStore();

const props = defineProps({
	isFirstStep: Boolean,
	isLastStep: Boolean,
});
</script>
